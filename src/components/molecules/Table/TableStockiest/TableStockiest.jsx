import { Button, ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useStockiestStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { ACTION_TYPES } from '@/utils/constants';

export const TableStockiest = ({ selectedCategory }) => {
	const { isSystem } = useAuthStore();
	const { fetchingProductList, productList, getProductList, deleteProduct } = useStockiestStore();
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [data, setData] = useState([]);

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const params = { limit: perPage, offset: offsetResult };

		if (selectedCategory) Object.assign(params, { product_category_id: selectedCategory.id });

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			getProductList(params);
		}
	}, [selectedCategory, page, perPage, pageCount]);

	useEffect(() => {
		if (productList) {
			setData(productList.items);
			setPageCount(Math.ceil(productList.total / perPage));
		}
	}, [productList, pageCount]);

	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				Cell: (row) => {
					return <div className="text-gray-400">{Number(row.row.id) + 1}</div>;
				}
			},
			{
				Header: 'Gambar Barang',
				minWidth: 125,
				Cell: (row) => (
					<div className="w-full flex justify-center">
						<img
							src={row.row.original?.image_url ? row.row.original?.image_url : require('@/images/dummy-product.webp')}
							className="w-24"
						/>
					</div>
				)
			},
			{
				Header: 'Kode Unik Barang',
				minWidth: 100,
				Cell: (row) => <div className="transform: uppercase">{row.row.original.sku_code}</div>
			},
			{
				Header: 'Nama Barang',
				minWidth: 150,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.name}</div>
			},
			{
				Header: 'Kategori',
				minWidth: 150,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.category.name}</div>
			},
			{
				Header: 'Deskripsi',
				minWidth: 150,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.description}</div>
			},
			{
				Header: 'Jumlah',
				accessor: 'quantity',
				maxWidth: 100
			},
			{
				Header: 'Actions',
				minWidth: 180,
				Cell: (row) => {
					return (
						isSystem && (
							<div className="grid grid-cols-1 gap-2">
								<ButtonAction
									className="min-w-[100px] w-full"
									action={ACTION_TYPES.SEE_DETAIL}
									linkTo={`/stockiest/${row.row.original.id}`}
								/>
								<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/stockiest/update/${row.row.original.id}`} />
								<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteProduct(row.row.original.id)} />
							</div>
						)
					);
				}
			}
		],
		[]
	);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					title={selectedCategory ? `Daftar Barang ${selectedCategory?.name}` : 'Daftar Semua Barang'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem}
					showButtonCreate={true}
					showButtonCheckout={true}
					feature={'Barang'}
					featurePath="/stockiest"
				/>
			</div>
			<div className="overflow-x-auto">
				<Table columns={columns} data={data} loading={fetchingProductList || productList === null} />
			</div>
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};
