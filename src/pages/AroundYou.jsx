import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    // Fetch the country using IP
    const fetchCountry = async () => {
      try {
        const res = await axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_7We1JBLJcBXcvoFzMsD51XwkmnD45`);
        setCountry(res?.data?.location?.country);
      } catch (err) {
        console.error('Error fetching country:', err);
        setErrorMessage('Failed to fetch location. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, []);

  useEffect(() => {
    // Handle API errors here
    if (error) {
      if (error.status === 429) {
        setErrorMessage('Too many requests. Please wait a moment and try again.');
      } else if (error.status === 422) {
        setErrorMessage('Invalid request. Please check the input.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  }, [error]);

  if (loading) return <Loader title="Loading songs around you" />;
  if (errorMessage) return <Error message={errorMessage} />;

  return (
    <div className='flex flex-col'>
      <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
        Around You <span className='font-black'>{country}</span>
      </h2>

      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
}

export default AroundYou;
