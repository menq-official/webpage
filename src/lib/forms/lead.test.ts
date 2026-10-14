import { describe, it, expect } from "vitest";
import { validateLead, isHoneypotTripped, isValidPhone } from "@/lib/forms/lead";

const messages = {
  name: "name",
  contact: "contact",
  email: "email",
  phone: "phone",
  solution: "solution",
  message: "message",
};

describe("validateLead", () => {
  it("passes a valid lead", () => {
    const errors = validateLead(
      { name: "Ann", email: "a@b.com", interestedSolution: "crm", message: "We need a CRM system." },
      messages,
    );
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("requires a name of at least 2 chars", () => {
    const errors = validateLead(
      { name: "A", email: "a@b.com", interestedSolution: "crm", message: "Long enough message." },
      messages,
    );
    expect(errors.name).toBe("name");
  });

  it("requires phone or email", () => {
    const errors = validateLead(
      { name: "Ann", interestedSolution: "crm", message: "Long enough message." },
      messages,
    );
    expect(errors.phone).toBe("contact");
  });

  it("rejects a malformed email", () => {
    const errors = validateLead(
      { name: "Ann", email: "nope", interestedSolution: "crm", message: "Long enough message." },
      messages,
    );
    expect(errors.email).toBe("email");
  });

  it("requires a solution and a 10+ char message", () => {
    const errors = validateLead(
      { name: "Ann", phone: "+37400", interestedSolution: "", message: "short" },
      messages,
    );
    expect(errors.interestedSolution).toBe("solution");
    expect(errors.message).toBe("message");
  });
});

describe("phone, untrusted input and the offered solutions", () => {
  const valid = { name: "Ann", interestedSolution: "crm", message: "Long enough message." };

  it("refuses a phone with letters (F03)", () => {
    expect(validateLead({ ...valid, phone: "abc" }, messages).phone).toBe("phone");
    expect(validateLead({ ...valid, phone: "+374 44 abc 447" }, messages).phone).toBe("phone");
  });

  it("accepts the usual ways of writing a phone number", () => {
    for (const phone of ["+374 44 74 74 47", "044747447", "(010) 12-34-56", "+1 202.555.0143"]) {
      expect(isValidPhone(phone), phone).toBe(true);
    }
  });

  it("refuses a phone with too few or too many digits", () => {
    expect(isValidPhone("12345")).toBe(false);
    expect(isValidPhone("+1234567890123456")).toBe(false);
  });

  it("treats a non-string field as empty instead of throwing", () => {
    const errors = validateLead({ ...valid, email: "a@b.com", name: 42 as unknown }, messages);
    expect(errors.name).toBe("name");
  });

  it("refuses a solution that is not offered when the list is given", () => {
    const offered = ["crm", "web"];
    expect(validateLead({ ...valid, email: "a@b.com" }, messages, offered)).toEqual({});
    expect(
      validateLead({ ...valid, email: "a@b.com", interestedSolution: "<script>" }, messages, offered)
        .interestedSolution,
    ).toBe("solution");
  });
});

describe("isHoneypotTripped", () => {
  it("trips when the website field is filled", () => {
    expect(isHoneypotTripped({ website: "http://spam" })).toBe(true);
  });

  it("passes when the website field is empty or absent", () => {
    expect(isHoneypotTripped({ website: "" })).toBe(false);
    expect(isHoneypotTripped({})).toBe(false);
  });
});
