import {
	ChakraProvider,
	Box,
	theme,
} from "@chakra-ui/react"
import Player from "./Player";
import ToquePlayer, { EventPlayerEnum, RepeatMode, TrackObject } from "./symlinkPlayer/dist"
import { playlist } from "./playlist";
import { useEffect, useState } from "react";

export const App = () => {

	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [repeatMode, setRepeatMode] = useState<RepeatMode>(ToquePlayer.getRepeatMode())
	const [currentSong, setCurrentSong] = useState<TrackObject>();

	useEffect(() => {
		console.log('UseEffect')
		ToquePlayer.addEventPlayerListener(EventPlayerEnum.SeekProgress, (data) => {

			const {
				currentTime,
				duration
			} = data
	
			setDuration(duration);
			setCurrentTime(currentTime);
		})
	
		ToquePlayer.addEventPlayerListener(EventPlayerEnum.TrackLoading, console.log)
		ToquePlayer.addEventPlayerListener(EventPlayerEnum.TrackReachToEnd, console.log)
		ToquePlayer.addEventPlayerListener(EventPlayerEnum.TrackChanged, function(data) {
			setCurrentSong(data.track);
			ToquePlayer.play();
		})
		ToquePlayer.addEventPlayerListener(EventPlayerEnum.Playing, function(data) {
			setIsPlaying(true);
		})
		ToquePlayer.addEventPlayerListener(EventPlayerEnum.Paused, function(data) {
			setIsPlaying(false);
		});
	}, []);

	async function startPlay() {
		const hasSongInQueue = ToquePlayer.hasTrackOnQueue();

		if (hasSongInQueue) {
			if (isPlaying) {
				ToquePlayer.pause();
			} else {
				ToquePlayer.play();
			}
		} else {
			await ToquePlayer.initPlayer(playlist, 0);
		}
	}

	async function toggleForward() {
		await ToquePlayer.skipToNext();
	}

	async function toggleRewind() {
		await ToquePlayer.skipToPrevious();
	}

	function toggleShuffle() {

	}

	function toggleRepeat() {
		const repeat = ToquePlayer.getRepeatMode();
		switch (repeat) {
			case RepeatMode.All:
				ToquePlayer.setRepeatMode(RepeatMode.Off);
				setRepeatMode(RepeatMode.Off);
				break;
			case RepeatMode.One:
				ToquePlayer.setRepeatMode(RepeatMode.All);
				setRepeatMode(RepeatMode.All);
				break;
		
			default:
				ToquePlayer.setRepeatMode(RepeatMode.One);
				setRepeatMode(RepeatMode.One)
				break;
		}
	}

	function moveSeekBar(currentDuration: number) {
		ToquePlayer.setUpdateCurrentTime(currentDuration);
	}

	return (
		<ChakraProvider theme={theme}>
			<Box
				textAlign="center"
				fontSize="xl"
				display={"flex"}
				flexDirection="column"
				alignItems="center"
				padding="60px"
				bg={"#253a3b"}
			>
				<Player
					onPlay={startPlay}
					onSkipNext={toggleForward}
					onSkipPrevious={toggleRewind}
					onShuffle={toggleShuffle}
					onRepeat={toggleRepeat}
					onSeekProgressBar={moveSeekBar}
					statePlaying={isPlaying}
					currentTime={currentTime}
					duration={duration}
					repeatMode={repeatMode}
					currentSong={currentSong}
				/>
			</Box>
		</ChakraProvider>
	)
}
