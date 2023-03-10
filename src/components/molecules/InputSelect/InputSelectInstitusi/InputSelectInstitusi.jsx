import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useKonstituenStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectInstitusi = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, ...props }, ref) => {
		const { konstituenList, fetchingKonstituenList, getKonstituenList } = useKonstituenStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			if (params) getKonstituenList({ limit: 10, offset: 0, ...params });
			else getKonstituenList();
		}, [params]);

		useEffect(() => {
			if (konstituenList?.total > 0) {
				const mapKonstituen = konstituenList.items.map((konstituen) => ({
					label: konstituen.name,
					value: konstituen.id
				}));
				setOptions(mapKonstituen);
			}
		}, [konstituenList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Institusi" name={props.name} />}
				<InputSelect
					ref={ref}
					options={options}
					loading={fetchingKonstituenList}
					onChange={onChange}
					placeholder={placeholder || 'Pilih Institusi'}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectInstitusi.displayName = 'InputSelectInstitusi';
InputSelectInstitusi.defaultProps = {
	name: 'institusi',
	containerClassName: '',
	showLabel: true
};
