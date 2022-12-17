import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useActivityStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';
import { Link, useParams } from 'react-router-dom';

export const InputSelectActivityPromise = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, ...props }, ref) => {
		const { activityID } = useParams();
		const { activityPromiseList, fetchingActivityPromiseList, getActivityPromiseList } = useActivityStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			if (params) getActivityPromiseList({ limit: 10, offset: 0, ...params });
			else getActivityPromiseList();
		}, [params]);

		useEffect(() => {
			if (activityPromiseList?.total > 0) {
				const mapPromise = activityPromiseList.items.map((promise) => ({
					label: promise.name,
					value: promise.id
				}));
				setOptions(mapPromise);
			}
		}, [activityPromiseList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Janji" name={props.name} />}
				<InputSelect
					ref={ref}
					options={options}
					loading={fetchingActivityPromiseList}
					placeholder={placeholder || 'Pilih Janji'}
					onChange={onChange}
					multi={true}
					{...props}
				/>
				{error && <InputError message={error.message} />}
				<div className="text-xs text-right text-gray-400">
					Tidak menemukan janji pada list?{' '}
					<Link to={`/activity/${activityID}/detail/promise/create`} className="text-blue-500 hover:text-blue-700">
						Buat janji baru
					</Link>
				</div>
			</div>
		);
	}
);

InputSelectActivityPromise.displayName = 'InputSelectActivityPromise';
InputSelectActivityPromise.defaultProps = {
	name: 'promise',
	containerClassName: '',
	showLabel: true,
	showPeriodeOnLabel: false,
	multiple: false
};