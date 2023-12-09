import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { AddLectureTab } from '../../components/class/lecture/addLectureTab.component';
import { AddAssessmentTab } from '../../components/class/assessment/addAssessmentTab.component';
import { AddExamTab } from '../../components/class/exam/addExamTab.component';
import { Typography } from '@mui/material';

export default function AddSomething() {
	const [valueTab, setValueTab] = useState(0);

	const handleChangeTab = (e, newValue) => {
		setValueTab(newValue);
	};

	return (
		<Box sx={{ height: '100%', width: '100%', alignContent: 'center' }}>
			<Typography variant="h2">Thêm nội dung cho chủ đề</Typography>
			<Tabs
				value={valueTab}
				onChange={handleChangeTab}
				variant="scrollable"
				textColor="primary"
				indicatorColor="primary"
				aria-label="scrollable force"
				sx={{
					marginTop: '50px',
				}}>
				<Tab value={0} label="Bài giảng" />
				<Tab value={1} label="Bài tập" />
				<Tab value={2} label="Bài kiểm tra" />
			</Tabs>

			{/* tab lecture */}
			{valueTab === 0 && <AddLectureTab />}

			{/* tab assessement */}
			{valueTab === 1 && <AddAssessmentTab />}

			{/* tab exam */}
			{valueTab === 2 && <AddExamTab />}
		</Box>
	);
}
