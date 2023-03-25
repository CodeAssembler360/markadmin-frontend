import { ColumnFilter } from './ColumnFilter';
export const COLUMNS = [
	{
		Header : 'Item Code',
		Footer : 'Item Code',
		accessor: 'itemCode',
		Filter: ColumnFilter,
	},
	{
		Header : 'Item Name',
		Footer : 'Item Name',
		accessor: 'itemName',
		Filter: ColumnFilter,
	},
	{
		Header : 'Purchases Unit Price',
		Footer : 'Purchases Unit Price',
		accessor: 'purchasesUnitPrice',
		Filter: ColumnFilter,
	},
	{
		Header : 'Purchases Account',
		Footer : 'Purchases Account',
		accessor: 'purchasesAccount',
		Filter: ColumnFilter,
	},
	{
		Header : 'Sales Unit Price',
		Footer : 'Sales Unit Price',
		accessor: 'salesUnitPrice',
		Filter: ColumnFilter,
	},
	{
		Header : 'Sales Account',
		Footer : 'Sales Account',
		accessor: 'salesAccount',
		Filter: ColumnFilter,
	},
]
