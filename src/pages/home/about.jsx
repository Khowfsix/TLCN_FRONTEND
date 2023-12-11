import React from 'react';
import { Link } from '@material-ui/core';
import { Box, Typography } from '@material-ui/core';

export default function About() {
	return (
		<Box>
			<Box className="text-gray-600 body-font">
				<Box className="container px-5 py-24 mx-auto">
					<Box className="flex flex-col">
						<Box className="h-1 bg-gray-200 rounded overflow-hidden">
							<Box className="w-24 h-full bg-indigo-500"></Box>
						</Box>
						<Box className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
							<Typography variant="h1" className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
								Space The Final Frontier
							</Typography>
							<Typography variant="body1" className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
								Street art subway tile salvia four dollar toast bitters selfies quinoa yuccie synth meditation iPhone intelligentsia prism tofu. Viral gochujang bitters dreamcatcher.
							</Typography>
						</Box>
					</Box>
					<Box className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
						<Box className="p-4 md:w-1/3 sm:mb-0 mb-6">
							<Box className="rounded-lg h-64 overflow-hidden">
								<img alt="content" className="object-cover object-center h-full w-full" src="https://dummyimage.com/1203x503" />
							</Box>
							<Typography variant="h2" className="text-xl font-medium title-font text-gray-900 mt-5">
								Shooting Stars
							</Typography>
							<Typography variant="body1" className="text-base leading-relaxed mt-2">
								Swag shoivdigoitch literally meditation subway tile tumblr cold-pressed. Gastropub street art beard dreamcatcher neutra, ethical XOXO lumbersexual.
							</Typography>
							<Link className="text-indigo-500 inline-flex items-center mt-3">
								Learn More
								<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
									<path d="M5 12h14M12 5l7 7-7 7"></path>
								</svg>
							</Link>
						</Box>
						<Box className="p-4 md:w-1/3 sm:mb-0 mb-6">
							<Box className="rounded-lg h-64 overflow-hidden">
								<img alt="content" className="object-cover object-center h-full w-full" src="https://dummyimage.com/1204x504" />
							</Box>
							<Typography variant="h2" className="text-xl font-medium title-font text-gray-900 mt-5">
								The Catalyzer
							</Typography>
							<Typography variant="body1" className="text-base leading-relaxed mt-2">
								Swag shoivdigoitch literally meditation subway tile tumblr cold-pressed. Gastropub street art beard dreamcatcher neutra, ethical XOXO lumbersexual.
							</Typography>
							<Link className="text-indigo-500 inline-flex items-center mt-3">
								Learn More
								<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
									<path d="M5 12h14M12 5l7 7-7 7"></path>
								</svg>
							</Link>
						</Box>
						<Box className="p-4 md:w-1/3 sm:mb-0 mb-6">
							<Box className="rounded-lg h-64 overflow-hidden">
								<img alt="content" className="object-cover object-center h-full w-full" src="https://dummyimage.com/1205x505" />
							</Box>
							<Typography variant="h2" className="text-xl font-medium title-font text-gray-900 mt-5">
								The 400 Blows
							</Typography>
							<Typography variant="body1" className="text-base leading-relaxed mt-2">
								Swag shoivdigoitch literally meditation subway tile tumblr cold-pressed. Gastropub street art beard dreamcatcher neutra, ethical XOXO lumbersexual.
							</Typography>
							<Link className="text-indigo-500 inline-flex items-center mt-3">
								Learn More
								<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
									<path d="M5 12h14M12 5l7 7-7 7"></path>
								</svg>
							</Link>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
