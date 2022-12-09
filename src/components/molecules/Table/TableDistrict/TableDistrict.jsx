import { ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useDistrictStore, usePartnerStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { objectToQueryString } from '@/utils/helpers';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableDistrict = ({
	title,
	displayedColumns,
	params,
	isReadonly,
	isShowFooter,
	isShowButtonSeeAll,
	enableClickRow
}) => {
	const navigate = useNavigate();

	const { isSystem } = useAuthStore();
	const { districtList, fetchingDistrictList, getDistrictList, deleteDistrict } = useDistrictStore();

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);

	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				hidden: displayedColumns && !displayedColumns.includes('#'),
				Cell: (row) => <div className="text-gray-400">{Number(row.row.id) + offset + 1}</div>
			},
			{
				Header: 'Nama Kecamatan',
				accessor: 'name',
				width: '100%',
				minWidth: 300,
				hidden: displayedColumns && !displayedColumns.includes('Nama Kecamatan')
			},
			{
				Header: 'Detail',
				minWidth: 180,
				hidden: displayedColumns && !displayedColumns.includes('Detail'),
				Cell: (row) => {
					return (
						<ButtonAction
							className="min-w-[100px] w-full"
							action={ACTION_TYPES.SEE_DETAIL}
							linkTo={`/district/${row.row.original.id}`}
						/>
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 220,
				hidden: !isSystem || isReadonly,
				Cell: (row) => {
					return (
						<div className="grid grid-cols-2 gap-2">
							<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/district/update/${row.row.original.id}`} />
							<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteDistrict(row.row.original.id)} />
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const handleClickRow = (rowData) => navigate(`/district/${rowData.id}`);

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult, is_follower: false };

		if (page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getDistrictList({ ...defaultParams, ...params });
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		if (districtList) {
			setData(districtList.items);
			setPageCount(Math.ceil(districtList.total / perPage));
		}
	}, [districtList, pageCount]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					feature="Kecamatan"
					title={title || 'List Kecamatan'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem || isReadonly}
					showButtonCreate={false}
					showButtonSeeAll={isShowButtonSeeAll}
					seeAllLink={'/district' + objectToQueryString(params)}
				/>
			</div>

			<div className="overflow-x-scroll">
				<Table
					columns={columns}
					data={data}
					loading={fetchingDistrictList || districtList === null}
					onClickRow={enableClickRow && handleClickRow}
				/>
			</div>
			{isShowFooter && (
				<div className="p-6">
					<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
				</div>
			)}
		</div>
	);
};

TableDistrict.defaultProps = {
	params: {},
	isShowFooter: true,
	isShowFilter: true
};
