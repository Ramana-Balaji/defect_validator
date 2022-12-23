import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Search,
  SaveAlt,
  Remove,
  LastPage,
  FirstPage,
  FilterList,
  Edit,
  DeleteOutline,
  Clear,
  ChevronRight,
  ChevronLeft,
  Check,
  ArrowUpward,
  AddBox as AddBoxIcon,
} from '@material-ui/icons';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable, { MTableBody, MTableToolbar } from 'material-table';
import shortid from 'shortid';
import { Button, Fab } from '@material-ui/core';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBoxIcon color="secondary" {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <Fab size="medium" color="secondary" aria-label="delete">
      <DeleteOutline {...props} ref={ref} />
    </Fab>
  )),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => (
    <Fab size="medium" color="primary" aria-label="edit">
      <Edit {...props} ref={ref} />
    </Fab>
  )),
  Export: forwardRef((props, ref) => <SaveAlt color="primary" {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const EditableTable = (props) => {
  const {
    title,
    data,
    style,
    columns,
    profiles,
    saveData,
    onDeleteAll,
    className,
    deleteAllEnabled,
    search,
    draggable,
    exportCsv,
    exportButton,
    exportFileName,
    exportAllData,
    customActions,
    selection,
    isEditable,
    filtering,
    selectionChange,
    totalCount,
    onChangePage,
    onChangeRowsPerPage,
    onRowClick,
    toolbarStyle,
    pageSize,
    pageSizeOptions,
    actionsColumnIndex,
    toolbarButtonAlignment,
    tableLayout,
    pageNumber,
  } = props;

  return (
    <MaterialTable
      title={title}
      icons={tableIcons}
      columns={columns}
      data={data}
      style={style}
      onSelectionChange={selectionChange}
      editable={
        isEditable
          ? {
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    const totalData = [...data];
                    const index = profiles.findIndex(
                      (profile) => profile.PROC_NAME === newData.PROC_NAME,
                    );
                    const finalData = profiles[index];
                    newData.id = shortid.generate();
                    totalData.push({ ...finalData, ...newData });
                    saveData(totalData, newData, null, 'added');
                    resolve();
                  }, 100);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    const totalData = [...data];
                    totalData[totalData.indexOf(oldData)] = newData;
                    saveData(totalData, newData, null, 'updated');
                    resolve();
                  }, 100);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    const totalData = [...data];
                    totalData.splice(totalData.indexOf(oldData), 1);
                    saveData(totalData, null, oldData, 'deleted');
                    resolve();
                  }, 100);
                }),
            }
          : {}
      }
      components={{
        Toolbar: (items) => (
          <div style={toolbarStyle}>
            <MTableToolbar {...items} />
            {deleteAllEnabled && (
              <Button
                className={className}
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => onDeleteAll()}
                style={{margin:'-25px 0 10px 10px', textTransform:'capitalize'}}
              >
                Delete all
              </Button>
            )}
          </div>
        ),
        Body: (bodyProps) => (
          <MTableBody
            {...bodyProps}
            onFilterChanged={(columnId, value) => {
              bodyProps.onFilterChanged(columnId, value);
            }}
          />
        ),
      }}
      onRowClick={(event, rowData) => onRowClick(event, rowData)}
      /* Pagination */
      totalCount={totalCount}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      page={pageNumber}
      /*            */
      actions={customActions}
      options={{
        pageSize,
        pageSizeOptions,
        draggable,
        actionsColumnIndex,
        exportButton,
        search,
        exportAllData,
        exportFileName,
        exportCsv,
        selection,
        filtering,
        toolbarButtonAlignment,
        tableLayout,
        showTextRowsSelected: false,
        headerStyle: {
          zIndex: '5',
          fontWeight:'600 !important',
        },
      }}
    />
  );
};

EditableTable.defaultProps = {
  draggable: true,
  exportCsv: null,
  exportAllData: true,
  deleteAllEnabled: false,
  search: true,
  exportButton: true,
  exportFileName: 'data',
  title: '',
  data: [],
  profiles: [],
  customActions: [],
  selection: false,
  isEditable: true,
  filtering: false,
  totalCount: -1,
  onChangePage: () => {},
  selectionChange: () => {},
  onChangeRowsPerPage: () => {},
  onRowClick: () => {},
  toolbarStyle: { display: 'block' },
  pageNumber: undefined,
  pageSize: 15,
  pageSizeOptions: [5, 10, 15],
  actionsColumnIndex: -1,
  toolbarButtonAlignment: 'right',
  tableLayout: 'auto',
  whiteSpace: 'anywhere',
};

EditableTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(),
  columns: PropTypes.arrayOf().isRequired,
  customActions: PropTypes.arrayOf(PropTypes.node),
  exportCsv: PropTypes.func,
  saveData: PropTypes.func.isRequired,
  onDeleteAll: PropTypes.func.isRequired,
  profiles: PropTypes.arrayOf(),
  style: PropTypes.shape().isRequired,
  className: PropTypes.shape().isRequired,
  deleteAllEnabled: PropTypes.bool,
  draggable: PropTypes.bool,
  search: PropTypes.bool,
  selection: PropTypes.bool,
  exportButton: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({ csv: PropTypes.bool, pdf: PropTypes.bool }),
  ]),
  exportAllData: PropTypes.bool,
  exportFileName: PropTypes.string,
  isEditable: PropTypes.bool,
  filtering: PropTypes.bool,
  totalCount: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  selectionChange: PropTypes.func,
  onRowClick: PropTypes.func,
  themeType: PropTypes.bool.isRequired,
  toolbarStyle: PropTypes.objectOf(),
  pageNumber: PropTypes.number,
  pageSize: PropTypes.string,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
  actionsColumnIndex: PropTypes.number,
  toolbarButtonAlignment: PropTypes.string,
  tableLayout: PropTypes.string,
  whiteSpace: PropTypes.string,
};

export default EditableTable;
