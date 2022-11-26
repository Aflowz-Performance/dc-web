import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { usePartnerStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';
import Skeleton from 'react-loading-skeleton';

export const InputSelectStaff = forwardRef(({ error, onChange, ...props }, ref) => {
	const { partnerList, fetchingPartnerList, getPartnerList } = usePartnerStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		getPartnerList({ is_staff: true, limit: 10, offset: 0 });
	}, []);

	useEffect(() => {
		if (partnerList?.total > 0) {
			const mapPartner = partnerList.items.map((partner) => ({
				label: partner.name,
				value: partner.id
			}));

			setOptions(mapPartner);
		}
	}, [partnerList]);

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Staff PIC" name={props.name} />
			{fetchingPartnerList && <Skeleton height={36} />}
			{!fetchingPartnerList && <InputSelect ref={ref} options={options} onChange={onChange} {...props} />}
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectStaff.displayName = 'InputSelectStaff';