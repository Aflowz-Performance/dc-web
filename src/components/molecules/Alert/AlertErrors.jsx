import { Alert } from '@/components/atoms';
import React from 'react';

export const AlertErrors = ({ errors }) => {
	return (
		<Alert
			type="danger"
			message={
				<ul className="space-y-2">
					{errors &&
						Object.values(errors).map((message, index) => (
							<li key={index} className="list-disc list-outside ml-6">
								{message}
							</li>
						))}
				</ul>
			}
		/>
	);
};
