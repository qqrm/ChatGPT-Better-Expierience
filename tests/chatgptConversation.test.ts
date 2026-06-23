import { afterEach, describe, expect, it } from "vitest";
import {
  findMainComposerForm,
  findMainComposerInput,
  findMainSendButton,
  isEventInsideMainComposer
} from "../src/features/chatgptConversation";

const renderCurrentChatGptComposer = () => {
  document.body.innerHTML = `
    <main id="main">
      <form autocomplete="off" class="group/composer w-full">
        <div class="wcDTda_prosemirror-parent">
          <textarea
            class="wcDTda_fallbackTextarea"
            name="prompt-textarea"
            aria-label="Chat with ChatGPT"
            style="display: none;"
          ></textarea>
          <div
            contenteditable="true"
            class="ProseMirror"
            id="prompt-textarea"
            role="textbox"
            aria-multiline="true"
            aria-label="Chat with ChatGPT"
          >
            <p>hello</p>
          </div>
        </div>
        <button id="composer-submit-button" data-testid="send-button" aria-label="Send prompt" class="composer-submit-btn">
          Send
        </button>
      </form>
    </main>
  `;
};

describe("chatgptConversation", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("prefers the current visible ProseMirror composer over ChatGPT's hidden fallback textarea", () => {
    renderCurrentChatGptComposer();

    const input = findMainComposerInput();
    const form = findMainComposerForm();
    const sendButton = findMainSendButton();

    expect(input).toBeInstanceOf(HTMLElement);
    expect(input).not.toBeInstanceOf(HTMLTextAreaElement);
    expect((input as HTMLElement | null)?.classList.contains("ProseMirror")).toBe(true);
    expect(form?.classList.contains("group/composer")).toBe(true);
    expect(sendButton?.id).toBe("composer-submit-button");
    expect(isEventInsideMainComposer(input)).toBe(true);
  });
});
