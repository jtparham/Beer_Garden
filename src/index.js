import React from "react";
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import Input from '@material-ui/core/Input';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { RowDetailState } from '@devexpress/dx-react-grid';
import { FilteringState, IntegratedFiltering, PagingState, IntegratedPaging, DataTypeProvider} from "@devexpress/dx-react-grid";
import {Grid, Table, TableHeaderRow, TableFilterRow, PagingPanel, TableColumnResizing, TableRowDetail} from "@devexpress/dx-react-grid-material-ui";

const CurrencyEditorBase = ({ value, onValueChange, classes }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      onValueChange();
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <Input
      type="number"
      classes={{
        input: classes.numericInput,
      }}
      fullWidth
      value={value === undefined ? '' : value}
      inputProps={{
        min: 0,
        placeholder: 'Filter...',
      }}
      onChange={handleChange}
    />
  );
};

CurrencyEditorBase.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

CurrencyEditorBase.defaultProps = {
  value: undefined,
};

const RowDetail = ({ row }) => (
  <div>
    {row.beer_name}
    {': '}
    {row.descript}
  </div>
);

const styles = {
  numericInput: {
    textAlign: 'right',
    width: '100%',
  },
};
const CurrencyEditor = withStyles(styles)(CurrencyEditorBase);
const FilterIcon = ({ type, ...restProps }) => {
  return <TableFilterRow.Icon type={type} {...restProps} />;
};


class Beers extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "beer_name", title: "Name" },
        { name: "brewery_name", title: "Brewery" },
        { name: "abv", title: "A.B.V" },
        { name: "descript", title: "Description" },
        { name: "style_name", title: "Style" }
      ],
      columnWidths:[
        {columnName: 'beer_name', width: 250},
        {columnName: 'brewery_name', width: 250},
        {columnName: 'abv', width: 100},
        {columnName: 'descript', width: 800},
        {columnName: 'style_name', width: 175}
      ],
      rows: [],
      abvColumn: ["abv"],
      expandedRowIds: [],
      abvFilterOperations: ['equal', 'notEqual', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual']
    };

    fetch('http://localhost:3001/beerTable')
    .then(response => response.json())
    .then(gridData => {
      this.setState({
        rows: gridData
      })
    });

    this.changeColumnWidths = (columnWidths) => {
      this.setState({ columnWidths });
    };

    this.changeExpandedDetails = expandedRowIds => this.setState({ expandedRowIds });

    this.changeFilters = filters => this.setState({ filters });
  }

  render(){

    return (
      <Paper>
        <Grid 
        rows={this.state.rows} 
        columns={this.state.columns}
        >
          <PagingState
            defaultCurrentPage={0}
            pageSize={10}
          /> 

          <RowDetailState
            expandedRowIds={this.state.expandedRowIds}
            onExpandedRowIdsChange={this.changeExpandedDetails}
          />
        <DataTypeProvider
            for={this.state.abvColumn}
            availableFilterOperations={this.state.abvFilterOperations}
            editorComponent = {CurrencyEditor}
          />
          <FilteringState
            filters={this.state.filters}
            onFiltersChange={this.changeFilters}
          />
          <IntegratedFiltering />
          <IntegratedPaging /> 
          <Table />
          <TableColumnResizing 
            columnWidths = {this.state.columnWidths}
            onColumnWidthsChange= {this.changeColumnWidths} />
          <TableHeaderRow />
          <TableRowDetail
            contentComponent={RowDetail}/>
          <TableFilterRow 
            showFilterSelector
            iconComponent={FilterIcon}/>
          <PagingPanel />
        </Grid>
      </Paper>
      
    );
  }
}

render(<Beers />, document.getElementById("root"));
