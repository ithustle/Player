import {
	Image,
	Box,
	Text,
	Heading,
	HStack,
	Button,
	Slider,
	SliderTrack,
	SliderThumb,
	SliderFilledTrack,
} from "@chakra-ui/react"
import { GrPlayFill, GrPauseFill } from "react-icons/gr";
import { BiSkipNext, BiSkipPrevious, BiShuffle } from "react-icons/bi";
import { RiRepeat2Fill, RiRepeatOneFill } from "react-icons/ri";
import { RepeatMode, TrackObject } from "react-toque-player-hlstream";

type PlayerProps = {
	statePlaying: boolean
	currentTime: number
	duration: number,
	repeatMode: RepeatMode,
	currentSong?: TrackObject,
	onPlay: () => void
	onSkipNext: () => void
	onSkipPrevious: () => void
	onShuffle: () => void
	onRepeat: () => void
	onSeekProgressBar: (currentDuration: number) => void
}

export default function Player(props: PlayerProps) {

	const {
		statePlaying,
		currentTime,
		duration,
		repeatMode,
		currentSong,
		onPlay,
		onRepeat,
		onShuffle,
		onSkipNext,
		onSkipPrevious,
		onSeekProgressBar
	} = props;

	function formatTime(secs: number) {
		const hours = Math.floor(secs / 3600);
		const minutes = Math.floor((secs % 3600) / 60);
		const seconds = Math.floor((secs % 3600) % 60);

		if (secs >= 3600) {
			return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
				2,
				'0',
			)}:${String(seconds).padStart(2, '0')}`;
		}
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
			2,
			'0',
		)}`;
	};

	return (
		<>
			{
				currentSong?.cover ?
					<Image
						src={currentSong?.cover}
						alt="Capa do album"
						h="300px"
						w={"300px"}
						marginBottom="20px"
					/>
					:
					<Box
						bg={"#27293c"}
						h="300px"
						w={"300px"}
						marginBottom="20px"
					/>
			}
			<Heading
				color={"#fff"}
			>
				{currentSong?.title ?? "Sem música a tocar"}
			</Heading>
			<Text color={"#f0f0f0"}>
				{currentSong?.artist ?? "Sem artista"}
			</Text>
			<HStack
				h="20px"
				w={"560px"}
				margin="20px"
				spacing={"16px"}
			>
				<Text color={"#f0f0f0"}>
					{formatTime(currentTime)}
				</Text>
				<Slider
					aria-label='slider-ex-2'
					value={currentTime}
					max={isNaN(duration) ? 0 : duration}
					min={0}
					onChange={onSeekProgressBar}
				>
					<SliderTrack>
						<SliderFilledTrack />
					</SliderTrack>
					<SliderThumb />
				</Slider>
				<Text color={"#f0f0f0"}>
				{formatTime(duration)}
				</Text>
			</HStack>
			<HStack
				h="80px"
				w="500px"
				spacing="16px"
				justifyContent={"center"}
			>
				<Button
					onClick={onRepeat}
					variant='ghost'
					w="54px"
					h="54px"
					cursor={"pointer"}
					_hover={{}}
					_active={{}}
				>
					{
						repeatMode === RepeatMode.All ?
							<RiRepeat2Fill
								color="#ff2a00"
								size={"100%"}
							/>
							:
							repeatMode === RepeatMode.One ?
								<RiRepeatOneFill
									color="#ff2a00"
									size={"100%"}
								/>
								:
								<RiRepeat2Fill
									color="#fff"
									size={"100%"}
								/>
					}
				</Button>
				<Button
					onClick={onSkipPrevious}
					cursor={"pointer"}
					variant='ghost'
					w="64px"
					h="64px"
					_hover={{}}
					_active={{}}
				>
					<BiSkipPrevious color="#fff" size={"100%"} />
				</Button>
				<Button
					onClick={onPlay}
					cursor={"pointer"}
					variant='ghost'
					bg={"#999"}
					borderRadius={100}
					w="48px"
					h="48px"
					_hover={{
						bg: "#777"
					}}
					_active={{
						bg: "#555"
					}}
				>
					{
						statePlaying ?
							<GrPauseFill color="#fff" size={18} style={{ marginLeft: "2px" }} />
							:
							<GrPlayFill color="#26393B" size={18} style={{ marginLeft: "2px", fill: "#26393B" }} />
					}
				</Button>
				<Button
					onClick={onSkipNext}
					cursor={"pointer"}
					variant='ghost'
					w="64px"
					h="64px"
					_hover={{}}
					_active={{}}
				>
					<BiSkipNext color="#fff" size={"100%"} />
				</Button>
				<Button
					onClick={onShuffle}
					variant='ghost'
					cursor={"pointer"}
					w="54px"
					h="54px"
					_hover={{}}
					_active={{}}
				>
					<BiShuffle color="#fff" size={"100%"} />
				</Button>
			</HStack>
		</>
	)
}