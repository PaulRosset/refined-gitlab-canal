import { h } from "dom-chef";
import select from "select-dom";

// Prettier stuff
import prettier from "prettier/standalone";
import markdown from "prettier/parser-markdown";

const options = {
  parser: "markdown",
  plugins: [markdown],
};

const prettierButtonFn = key => (
  <li id={key}>
    <button class="js-md-write-button">Prettier</button>
  </li>
);

function applyPrettier(isOnSpecificIssue) {
  const navTabs = select.all(".nav-tabs", select(".md-header"));
  const navBarEdit =
    navTabs.length > 0
      ? navTabs
      : select.all(".nav-links", select(".md-header"));
  for (let i = 0; i < navBarEdit.length; i++) {
    const navBarToEdit = navBarEdit[i];
    const prettierButton = prettierButtonFn(`prettierButton-${i}`);
    navBarToEdit.insertBefore(
      prettierButton,
      navBarToEdit.children[navBarToEdit.children.length - 1],
    );
    prettierButton.addEventListener("click", () => {
      const text = select("textarea", navBarToEdit.parentElement.parentElement);
      if (prettier.check(text.value, options)) {
        return;
      }
      const textFormatted = prettier.format(text.value, options);
      text.value = textFormatted;
    });
  }

  // Because there is no other to know if we are on edit for issue...
  if (isOnSpecificIssue) {
    select(".btn-edit").addEventListener("click", () => {
      setTimeout(() => {
        const navBarEditIssueEdit = select(".nav-links");
        const prettierButtonIssueEdit = prettierButtonFn(
          "prettierButton-issueEdit",
        );
        navBarEditIssueEdit.insertBefore(
          prettierButtonIssueEdit,
          navBarEditIssueEdit.children[navBarEditIssueEdit.children.length - 1],
        );
        prettierButtonIssueEdit.addEventListener("click", () => {
          const text = select("#issue-description");
          if (prettier.check(text.value, options)) {
            return;
          }
          const textFormatted = prettier.format(text.value, options);
          text.value = textFormatted;
        });
      }, 500);
    });
  }
}

export default applyPrettier;
