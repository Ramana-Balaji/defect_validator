import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  TextField,
  Button,
} from "@material-ui/core";
import DefaultLayout from "../components/defaultLayout";
import defectValidator from "../actions/defectValidator.actions";
import { getDefectValidatorRows, isLoading } from "../selectors/defectValidator.selector";
import { get, isEmpty } from "lodash";
import { connect } from "react-redux";
import {  MSG_FILL_BLANK_FIELD } from "../config/constants";
import EditableTable from "../components/EditableTable";
import moment from "moment";

const styles = () => ({
  header: {
    position: "sticky",
    top: "0",
    zIndex: "10",
    width: "100%",
    height: "80px",
    background: "linear-gradient(90deg, #3f51b5, #c51162)",
    minWidth: "700px",
    marginBottom: "15px",
    color: '#fff',
    textAlign: 'center',
    verticleAlign: 'middle',
    lineHeight: '80px',
    fontWeight: '600',
    fontSize:'18px'
  },
  button: {
    display: 'flex',
    margin: '15px',
    justifyContent:'end'
  },
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allRowsData: [],
      date: "",
      logoutTime: "",
      description: "",
      summary: "",
      steps: '',
      results: "",
      testData: '',
      e2eId: '',
      caseId: '',
      coRelationId: '',
      transId:'',
    };
    this.props.listRowData();
  }

  componentDidUpdate = async (prevProps) => {
    const { rowsDatas } = this.props;
    if (prevProps.rowsDatas !== rowsDatas) {
      await this.setState({ allRowsData:rowsDatas});
    }
  };

downloadCsv = (data, fileName = 'export') => {
  let csvStr = '';
  data.forEach((rowArray) => {
    const rowStr = rowArray.join(',');
    csvStr += `${rowStr}\n`;
  });

  const link = document.createElement('a');
  link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvStr)}`;
  link.target = '_blank';
  link.download = `${fileName}.csv`;
  link.click();
};

  exportAsExcel = (_columns, renderData) => {
    const rows = renderData
      .map(({ 
      description,
      summary,
      steps,
      results,
      testData,
      e2eId,
      caseId,
      coRelationId,
        transId, }) => [
          description,
      summary,
      steps,
      results,
      testData,
      e2eId,
      caseId,
      coRelationId,
      transId,]);
    this.downloadCsv(rows, `${moment(new Date()).format('MMMM Do yyyy, h:mm:ss a')} defect_validator`);
  };

  getVariableColumns = () => {
    const columns = [
      {
        title: "Description",
        field: "description",
        editable: (_columnData, rowData) =>
          typeof get(rowData, "description", "") === "string",
        render: this.renderVariableValue,
        validate: (rowData) => !isEmpty(rowData.description),
        editComponent: (props) => {
          const { value = "" } = props;
          return (
            <TextField
              name="description"
              id="description"
              onChange={(e) => props.onChange(e.target.value)}
              value={value}
              error={isEmpty(value)}
              helperText={isEmpty(value) ? MSG_FILL_BLANK_FIELD : ""}
            />
          );
        },
      },
      {
        title: "Summary",
        field: "summary",
        editable: (_columnData, rowData) =>
          typeof get(rowData, "summary", "") === "string",
        render: this.renderVariableValue,
        validate: (rowData) => !isEmpty(rowData.summary),
        editComponent: (props) => {
          const { value = "" } = props;
          return (
            <TextField
              id="summary"
              name="summary"
              value={value}
              onChange={(e) => props.onChange(e.target.value)}
              error={isEmpty(value)}
              helperText={isEmpty(value) ? MSG_FILL_BLANK_FIELD : ""}
            />
          );
        },
      },
      {
        title: "Steps to Reproduce",
        field: "steps",
        editable: (_columnData, rowData) =>
          typeof get(rowData, "steps", "") === "string",
        render: this.renderVariableValue,
        validate: (rowData) => !isEmpty(rowData.steps),
        editComponent: (props) => {
          const { value = "" } = props;
          return (
            <TextField
              id="steps"
              name="steps"
              value={value}
              onChange={(e) => props.onChange(e.target.value)}
              error={isEmpty(value)}
              helperText={isEmpty(value) ? MSG_FILL_BLANK_FIELD : ""}
            />
          );
        },
      },
      {
        title: "Expected & Actual Result",
        field: "results",
        editable: (_columnData, rowData) =>
          typeof get(rowData, "results", "") === "string",
        render: this.renderVariableValue,
        validate: (rowData) => !isEmpty(rowData.results),
        editComponent: (props) => {
          const { value = "" } = props;
          return (
            <TextField
              id="results"
              name="results"
              value={value}
              onChange={(e) => props.onChange(e.target.value)}
              error={isEmpty(value)}
              helperText={isEmpty(value) ? MSG_FILL_BLANK_FIELD : ""}
            />
          );
        },
      },
      {
        title: "Test Data Used",
        field: "testData",
        editable: (_columnData, rowData) =>
          typeof get(rowData, "testData", "") === "string",
        render: this.renderVariableValue,
        validate: (rowData) => !isEmpty(rowData.testData),
        editComponent: (props) => {
          const { value = "" } = props;
          return (
            <TextField
              id="testData"
              name="testData"
              value={value}
              onChange={(e) => props.onChange(e.target.value)}
              error={isEmpty(value)}
              helperText={isEmpty(value) ? MSG_FILL_BLANK_FIELD : ""}
            />
          );
        },
      },
      {
        title: "E2E ID",
        field: "e2eId",
        editable: (_columnData, rowData) =>
          typeof get(rowData, "e2eId", "") === "string",
        render: this.renderVariableValue,
        validate: (rowData) => !isEmpty(rowData.e2eId),
        editComponent: (props) => {
          const { value = "" } = props;
          return (
            <TextField
              id="e2eId"
              name="e2eId"
              value={value}
              onChange={(e) => props.onChange(e.target.value)}
              error={isEmpty(value)}
              helperText={isEmpty(value) ? MSG_FILL_BLANK_FIELD : ""}
            />
          );
        },
      },
      {
        title: "Case ID",
        field: "caseId",
        editable: (_columnData, rowData) =>
          typeof get(rowData, "caseId", "") === "string",
        render: this.renderVariableValue,
        validate: (rowData) => !isEmpty(rowData.caseId),
        editComponent: (props) => {
          const { value = "" } = props;
          return (
            <TextField
              id="caseId"
              name="caseId"
              value={value}
              onChange={(e) => props.onChange(e.target.value)}
              error={isEmpty(value)}
              helperText={isEmpty(value) ? MSG_FILL_BLANK_FIELD : ""}
            />
          );
        },
      },
      {
        title: "Co-Relation ID",
        field: "coRelationId",
        editable: (_columnData, rowData) =>
          typeof get(rowData, "coRelationId", "") === "string",
        render: this.renderVariableValue,
        validate: (rowData) => !isEmpty(rowData.coRelationId),
        editComponent: (props) => {
          const { value = "" } = props;
          return (
            <TextField
              id="coRelationId"
              name="coRelationId"
              value={value}
              onChange={(e) => props.onChange(e.target.value)}
              error={isEmpty(value)}
              helperText={isEmpty(value) ? MSG_FILL_BLANK_FIELD : ""}
            />
          );
        },
      },
      {
        title: "Trans ID",
        field: "transId",
        editable: (_columnData, rowData) =>
          typeof get(rowData, "transId", "") === "string",
        render: this.renderVariableValue,
        validate: (rowData) => !isEmpty(rowData.transId),
        editComponent: (props) => {
          const { value = "" } = props;
          return (
            <TextField
              id="transId"
              name="transId"
              value={value}
              onChange={(e) => props.onChange(e.target.value)}
              error={isEmpty(value)}
              helperText={isEmpty(value) ? MSG_FILL_BLANK_FIELD : ""}
            />
          );
        },
      },
    ];
    return columns;
  };

  deleteAllVariables = async () => {
    await this.setState({ allRowsData: [] });
    this.saveDetails();
  };

  updateVariables = async (allRowsData) => {
    await this.setState({ allRowsData });
  };

  saveDetails = () => {
    const { saveDefectValidatorSheets } = this.props
    const {allRowsData} = this.state
    saveDefectValidatorSheets(allRowsData)
  }

  render() {
    const { classes = {} } = this.props;
    const { allRowsData = [] } = this.state;
    
    return (
      <>
        <DefaultLayout>
          <div className={classes.header}>
            Defect Validator
          </div>
          <EditableTable
            draggable
            data={allRowsData}
            profiles={[]} 
            columns={this.getVariableColumns()}
              deleteAllEnabled
            onDeleteAll={this.deleteAllVariables}
            saveData={this.updateVariables}
            className={classes.button}
            exportCsv={this.exportAsExcel}
          />
          <div className={classes.button}>
            <Button color='primary' variant='contained' onClick={this.saveDetails}>Save</Button>
          </div>
        </DefaultLayout>
      </>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  listRowData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: isLoading(state),
  rowsDatas: getDefectValidatorRows(state),
});

const mapDispatchToProps = (dispatch) => ({
  saveDefectValidatorSheets: (data) => dispatch (defectValidator.saveDefectValidatorSheet(data)),
  listRowData: () => dispatch (defectValidator.fetchDefectValidator()),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
