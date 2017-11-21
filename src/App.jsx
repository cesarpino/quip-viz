import quip from "quip";
import Styles from "./App.less";
import Viz from "viz.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: {src: "", width: 0, height: 0},
      editMode: this.props.editMode
    };

    this.generate(this.props.richTextRecord);

    this.props.richTextRecord.listenToContent((updatedRecord) => {
      this.generate(updatedRecord);
    });
  };

  componentDidMount() {
    this._richTextListener = this.props.richTextRecord.listenToContent((updatedRecord) => {
      this.generate(updatedRecord);
    });

    this._rootRecordListener = quip.apps.getRootRecord().listen((updatedRecord) => {
      this.mode(updatedRecord.get("editMode"));
    });
  }

  componentWillUnmount() {
    if (this._richTextListener) {
      this.props.richTextRecord.unlistenToContent(this._richTextListener);
    }

    if (this._editModeListener) {
      this.props._rootRecordListener.unlisten(this._rootRecordListener);
    }
  }

  static propTypes = {
    richTextRecord: React.PropTypes.instanceOf(quip.apps.RichTextRecord).isRequired
  };

  mode(mode) {
    this.setState({
      editMode: mode
    });
  }

  generate(record) {
    try {
      Viz.svgXmlToPngImageElement(Viz(record.getTextContent(), { format: "svg" }), 1, (err, data) => {
        data && this.setState({
          graph: {src: data.src, width: data.width, height: data.height}
        });
      });
    }
    catch (err) {
      console.log(err);
    }
  };

  render() {
    var style = {
      backgroundColor: `${quip.apps.ui.ColorMap.YELLOW.VALUE_LIGHT}`,
      padding: 10,
    };

    if (this.state.editMode) {
      return (
        <div>
          <div className={Styles.hello} style={style}>
            <quip.apps.ui.RichTextBox
                record={this.props.richTextRecord}
                width={"100%"}
                minHeight={"100%"}
                maxHeight={"100%"}
                minWidth={"100%"}
                maxWidth={"100%"}
                disableInlineMenus={true}
                disableAutocomplete={true}
            />
          </div>
          <img src={this.state.graph.src} height={this.state.graph.height} width={this.state.graph.width}/>
        </div>
      );
    } else {
      return (
        <div>
          <img src={this.state.graph.src} height={this.state.graph.height} width={this.state.graph.width}/>
        </div>
      );
    }
  };
}
