import * as yup from 'yup';

export const loginSchema = yup.object().shape({
	username: yup.string().required('Username wajib diisi'),
	password: yup.string().required('Password wajib diisi')
});

export const formProgramSchema = yup.object().shape(
	{
		program_category_id: yup.number().required('Mitra wajib diisi'),
		name: yup.string().required('Nama program wajib diisi'),
		periode: yup.number('Periode harus berupa angka').required('Periode wajib diisi'),
		pic_staff_id: yup.number().required('PIC internal wajib diisi'),
		pic: yup.string().required('PIC eksternal wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC eksternal wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka')
	},
	['pic_mobile', 'pic_mobile']
);

export const formKonstituenSchema = yup.object().shape(
	{
		name: yup.string().required('Nama Institusi wajib diisi'),
		konstituen_type: yup.string().required('Tipe konstitusi wajib dipilih'),
		address: yup.string().required('Belum mengisi alamat institusi'),
		city: yup.number().required('Belum memilih kota asal institusi'),
		pic: yup.string().required('Belum mengisi PIC institusi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC institusi wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka'),
		pic_staff_id: yup.number().required('Belum memilih PIC Staff')
	},
	['pic_mobile', 'pic_mobile']
);

export const formStaffSchema = yup.object().shape({
	nik_number: yup
		.string()
		.matches(/^[0-9]*$/, 'NIK tidak valid')
		.min(16, 'NIK tidak valid')
		.max(16, 'NIK tidak valid')
		.required('NIK wajib diisi'),
	name: yup.string().required('Nama wajib diisi'),
	address: yup.string().required('Belum mengisi alamat domisili'),
	city: yup.number().required('Belum memiliih kota domisili'),
	mobile: yup
		.string()
		.required('Nomor wajib diisi')
		.matches(/^[0-9]*$/, 'Nomor tidak valid')
		.min(8, 'Minimal 8 angka'),
	email: yup.string().email().required('Belum mengisi email'),
	gender: yup.string().required('Belum memilih jenis kelamin'),
	staff_title: yup.string().required('Belum memiliih role')
});
