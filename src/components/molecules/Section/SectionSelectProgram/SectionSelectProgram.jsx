import { useProgramStore } from '@/store';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

export const SectionSelectProgram = ({ selectedProgram, onSelectProgram }) => {
	const { fetchingProgramList, programList, getProgramList } = useProgramStore();

	useEffect(() => {
		getProgramList();
	}, []);

	return (
		<section className="bg-white rounded-md">
			<div>
				<div className="container space-y-3 text-left 2xl:text-center pt-6 pb-4">
					<div className="text-xl md:text-2xl font-extralight">Select Program</div>
				</div>
				{(fetchingProgramList || programList === null) && (
					<div className="container max-w-screen-md pb-6">
						<Skeleton inline containerClassName="grid grid-cols-3 gap-3" height={50} count={3} />
					</div>
				)}
				{!fetchingProgramList && programList?.total > 0 && (
					<div className="container">
						<div className="overflow-x-scroll pb-4 md:pb-6 flex gap-3">
							{programList.items.map((category) => (
								<button
									key={category.id}
									className={`w-[200px] min-w-[200px] lg:w-[250px] lg:min-w-[250px] flex items-center text-left border px-2 py-2 rounded-md cursor-pointer space-x-2 ${
										selectedProgram && selectedProgram.id === category.id
											? 'bg-primary-500  border-primary-500 hover:bg-primary-500 text-white'
											: 'text-gray-400 hover:bg-gray-100'
									}`}
									onClick={() => onSelectProgram(category)}
								>
									<img className="w-10" src={require('@/images/icons/box.svg').default} alt="" />
									<div className="text-xs">{category.name}</div>
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
};
