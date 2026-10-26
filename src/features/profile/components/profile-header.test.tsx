import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { USER } from "@/features/profile/data/user";

const play = vi.hoisted(() => vi.fn());
vi.mock("@/hooks/use-sound", () => ({ useSound: () => play }));

import { ProfileHeader } from "./profile-header";
import { PronounceMyName } from "./pronounce-my-name";

describe("ProfileHeader", () => {
  it("shows the avatar, name and first flip sentence", () => {
    const { container } = render(<ProfileHeader />);

    expect(screen.getByAltText(`${USER.displayName}'s avatar`)).toHaveAttribute(
      "src",
      USER.avatar
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      USER.displayName
    );
    expect(screen.getByText(USER.flipSentences[0])).toBeInTheDocument();
    expect(container.querySelectorAll("svg g line")).toHaveLength(24);
  });

  it("offers name pronunciation only when a recording exists", () => {
    render(<ProfileHeader />);

    expect(
      screen.queryByRole("button", { name: "Pronounce my name" }) !== null
    ).toBe(Boolean(USER.namePronunciationUrl));
  });
});

describe("PronounceMyName", () => {
  it("plays the recording on click", async () => {
    const user = userEvent.setup();
    render(<PronounceMyName namePronunciationUrl="/audio/name.mp3" />);

    await user.click(screen.getByRole("button", { name: "Pronounce my name" }));

    expect(play).toHaveBeenCalledTimes(1);
  });
});
