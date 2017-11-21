import quip from "quip";
import App from "./App.jsx";

class StickyNoteRoot extends quip.apps.RootRecord {
  static getProperties() {
    return {
        "stickyNote": quip.apps.RichTextRecord,
        "editMode": "boolean"
    };
  }

  static getDefaultProperties() {
    return {
      "stickyNote": {},
      "editMode": false
    };
  }

  seed() {
    const defaultValues = this.constructor.getDefaultProperties();

    Object.keys(defaultValues).forEach(key => {
        this.set(key, defaultValues[key]);
    });
  }
}

quip.apps.registerClass(StickyNoteRoot, "root");

quip.apps.initialize({
  initializationCallback: function(rootNode, params) {
    let rootRecord = quip.apps.getRootRecord();
    if (params.isCreation) {
      rootRecord.seed();
    }

    if (rootRecord.get("editMode")) {
      quip.apps.updateToolbarCommandsState([], ["editMode"]);
    } else {
      quip.apps.updateToolbarCommandsState([], ["viewMode"]);
    }

    ReactDOM.render(<App richTextRecord={rootRecord.get("stickyNote")} editMode={rootRecord.get("editMode")} />, rootNode);
  },
  menuCommands: [
    {
      id: quip.apps.DocumentMenuCommands.MENU_MAIN,
      subCommands: [
        "viewMode",
        "editMode",
      ],
    },
    {
      id: "viewMode",
      label: "View Mode",
      handler: () => {
        quip.apps.getRootRecord().set("editMode", false);
        quip.apps.updateToolbarCommandsState([], ["viewMode"]);
      },
    },
    {
      id: "editMode",
      label: "Edit Mode",
      handler: () => {
        quip.apps.getRootRecord().set("editMode", true);
        quip.apps.updateToolbarCommandsState([], ["editMode"]);
      },
    }
  ],
  toolbarCommandIds: [
    quip.apps.DocumentMenuCommands.MENU_MAIN
  ],
});
