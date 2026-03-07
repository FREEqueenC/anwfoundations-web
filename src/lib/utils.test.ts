import { describe, it, expect } from "vitest"
import { cn } from "./utils"

describe("cn", () => {
  it("merges simple class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("handles arrays of class names", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz")
  })

  it("handles objects with truthy/falsy values", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz")
  })

  it("handles conditionals and falsy values", () => {
    expect(cn("foo", false && "bar", null, undefined, 0, "baz")).toBe("foo baz")
  })

  it("merges tailwind classes correctly", () => {
    // twMerge behavior: later classes override earlier ones with the same utility prefix
    expect(cn("px-2 py-1 bg-red-500", "p-3 bg-[#B91C1C]")).toBe("p-3 bg-[#B91C1C]")
  })

  it("handles complex combinations", () => {
    const isError = true
    const isDisabled = false
    expect(
      cn(
        "text-base font-medium",
        isError ? "text-red-500" : "text-gray-900",
        { "opacity-50 cursor-not-allowed": isDisabled },
        ["px-4", "py-2"],
        "rounded-md"
      )
    ).toBe("text-base font-medium text-red-500 px-4 py-2 rounded-md")
  })
})
