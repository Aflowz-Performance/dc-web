import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import React, { forwardRef } from 'react';

export const InputSelectInstitusiType = forwardRef(({ error, onChange, ...props }, ref) => {
	const options = [
		{ label: 'Sekolah', value: 'sekolah' },
		{ label: 'Perguruan Tinggi', value: 'kampus' },
		{ label: 'Sektor Pariwisata dan Ekonomi Kreatif', value: 'parekraf' },
		{ label: 'Sektor Olahraga dan Seni', value: 'olahragaseni' },
		{ label: 'Perangkat KOKADES', value: 'kokades' },
		{ label: 'Lainnya', value: 'lainnya' }
	];

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Tipe Institusi" name={props.name} />
			<InputSelect ref={ref} options={options} loading={false} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectInstitusiType.displayName = 'InputSelectInstitusiType';
InputSelectInstitusiType.defaultProps = {
	name: 'konstituen_type'
};
