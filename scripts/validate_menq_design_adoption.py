from __future__ import annotations
import json, re, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
errors=[]; warnings=[]

def read(rel):
 p=ROOT/rel
 if not p.is_file(): errors.append(f'Missing required file: {rel}'); return ''
 return p.read_text(encoding='utf-8')

record=json.loads(read('docs/menq-standard/evidence/adoption-record.json') or '{}')
expected={
 'schemaVersion':2,
 'consumerId':'menq.webpage.public-site-admin',
 'parentStandardRepository':'menqstudio/MenQ-Standard',
 'parentDecision':'D-025',
 'designPlatformStatus':'Locked',
 'adoptionMode':'pinned-vendored-artifact',
 'pullRequest':1,
 'mergeCommit':'d985a5718ed7ec47717fdf271d14580e8eb947cb',
}
for k,v in expected.items():
 if record.get(k)!=v: errors.append(f'Adoption record {k} must be {v!r}; got {record.get(k)!r}')
if record.get('adoptionStatus')!='ValidatedAndMerged': errors.append('Adoption status must be ValidatedAndMerged')
maturity=record.get('maturity')
if maturity not in ('M1-candidate','M2-pilot'): errors.append('Maturity must be M1-candidate or M2-pilot (M3+ needs independent conformance evidence)')
btc=record.get('brandTokenConsumption',{})
try: upstream=json.loads(read('src/styles/vendor/menq-brand-expression/UPSTREAM.json') or '{}')
except json.JSONDecodeError as e: errors.append(f'Invalid UPSTREAM.json: {e}'); upstream={}
for key in ('repository','commit','path','sha256'):
 if not btc.get(key) or btc.get(key)!=upstream.get(key): errors.append(f'brandTokenConsumption.{key} must match src/styles/vendor/menq-brand-expression/UPSTREAM.json')
for key in ('tokenVerifier','runtimeEvidence'):
 if not (ROOT/str(btc.get(key,''))).is_file(): errors.append(f'brandTokenConsumption.{key} script is missing')
if maturity!='M1-candidate' and record.get('authority',{}).get('maturityPromotionAuthorized') is not True: errors.append('Maturity above M1 requires recorded Owner promotion authority')
if maturity=='M2-pilot' and record.get('brandTokenConsumption',{}).get('status','').startswith('Validated') is not True: errors.append('M2-pilot requires validated brand-token CI evidence')

imports=[
 '@import "../styles/vendor/menq-brand-expression/tokens.vars.css";',
 '@import "../styles/tokens/primitives.css";',
 '@import "../styles/tokens/semantic.css";',
 '@import "../styles/tokens/components.css";',
 '@import "../styles/tokens/motion.css";',
 '@import "../styles/tokens/product-extension.css";',
 '@import "../styles/tokens/sections.css";',
]
global_css=read('src/app/globals.css')
pos=[global_css.find(x) for x in imports]
if any(x<0 for x in pos) or pos!=sorted(pos): errors.append('Token imports are missing or out of canonical order')
semantic=read('src/styles/tokens/semantic.css'); extension=read('src/styles/tokens/product-extension.css')
tokens={'--gradient-hero','--grid-line-color','--shadow-glow','--glass-bg','--glass-border-color','--glass-blur','--glass-shadow'}
for token in sorted(tokens):
 if token not in extension: errors.append(f'Missing Product Extension token: {token}')
 if token in semantic: errors.append(f'Product-local token leaked into semantic.css: {token}')

hexpat=re.compile(r'#[0-9a-fA-F]{3,8}\b')
for p in sorted((ROOT/'src').rglob('*')):
 if p.is_file() and p.suffix in {'.ts','.tsx','.js','.jsx','.css'} and 'styles/tokens' not in p.as_posix() and 'styles/vendor' not in p.as_posix():
  vals=sorted(set(hexpat.findall(p.read_text(encoding='utf-8'))))
  if vals: warnings.append(f"Review raw colors in {p.relative_to(ROOT)}: {', '.join(vals)}")
if warnings:
 print('MENQ DESIGN ADOPTION WARNINGS'); [print('-',x) for x in warnings]
if errors:
 print('MENQ DESIGN ADOPTION VALIDATION: RED'); [print('-',x) for x in errors]; sys.exit(1)
print('MENQ DESIGN ADOPTION VALIDATION: GREEN')
print('Validated adoption record, pinned brand-layer consumption, token order, and Product Extension isolation.')
