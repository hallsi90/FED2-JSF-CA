import { expect, test } from "vitest";
import { contactSchema } from "./contactSchema";

const validContact = {
  fullName: "Alex Morgan",
  subject: "Order question",
  email: "alex@example.com",
  message: "Can you help me with my order?",
};

test.each(["fullName", "subject", "email", "message"])(
  "rejects an empty %s",
  (field) => {
    const result = contactSchema.safeParse({ ...validContact, [field]: "" });

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.path)).toEqual([[field]]);
  },
);

test.each(["alex.example.com", "alex@"])(
  "rejects invalid email %s",
  (email) => {
    const result = contactSchema.safeParse({ ...validContact, email });

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.path)).toEqual([
      ["email"],
    ]);
  },
);

test.each([
  { field: "fullName", tooShort: "Al", minimum: "Ali" },
  { field: "subject", tooShort: "Or", minimum: "Ask" },
  { field: "message", tooShort: "123456789", minimum: "1234567890" },
])(
  "rejects $field below the minimum and accepts it at the minimum",
  ({ field, tooShort, minimum }) => {
    const rejected = contactSchema.safeParse({
      ...validContact,
      [field]: tooShort,
    });
    const accepted = contactSchema.safeParse({
      ...validContact,
      [field]: minimum,
    });

    expect(rejected.success).toBe(false);
    expect(rejected.error?.issues.map((issue) => issue.path)).toEqual([
      [field],
    ]);
    expect(accepted.success).toBe(true);
  },
);
