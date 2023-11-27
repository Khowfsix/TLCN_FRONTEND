import { Box, Typography, Button, Container } from '@material-ui/core';

export default function Home() {
	return (
		<>
			<Box className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
				<Box className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
					<img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
				</Box>
				<Box className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
					<Typography variant="h1" className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
						Before they sold out
						<br className="hidden lg:inline-block" />
						readymade gluten
					</Typography>
					<Typography variant="body1" className="mb-8 leading-relaxed">
						Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken
						authentic tumeric truffaut hexagon try-hard chambray.
					</Typography>
					<Box className="flex justify-center">
						<Button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</Button>
						<Button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
}
