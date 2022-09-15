import React, {useEffect, useState} from 'react';
import PlayersService from "./API/PlayersService";
import {StatsTable} from "./components/StatsTable";
import styled from "@emotion/styled/macro";
import {TextField} from "@mui/material";
import useDebounce from "./hooks/useDebounce";

export interface PlayersData {
    photo: string
    id: number
    name: string
    nick: string
    birthYear: number
    country: string
    won: number
    drawn: number
    lost: number
}

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [playersStats, setPlayersStats] = useState<Array<PlayersData>>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [totalElements, setTotalElements] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const debouncedSearchValue = useDebounce<string>(searchValue, 500)

    useEffect(() => {
        fetchPlayersStats()
    }, [debouncedSearchValue, page, pageSize]);

    const fetchPlayersStats = async () => {
        setIsLoading(true)
        let stats
        debouncedSearchValue ?
            stats = await PlayersService.searchBy(debouncedSearchValue, page, pageSize)
            : stats = await PlayersService.getAll(page, pageSize)
        if (stats) {
            const playersStats: Array<PlayersData> = stats.content?.map(({
                                                                             id,
                                                                             name,
                                                                             nick,
                                                                             birthYear,
                                                                             country,
                                                                             photo
                                                                         }: PlayersData) => ({
                id: id,
                name: name,
                nick: nick,
                birthYear: birthYear,
                country: country,
                photo: photo,
                won: Math.floor(Math.random() * 10),
                drawn: Math.floor(Math.random() * 10),
                lost: Math.floor(Math.random() * 10),
            }))
            setPlayersStats(playersStats)
            setTotalElements(stats.totalElements)
        } else {
            setPlayersStats([])
        }
        setIsLoading(false)
    }

    return (
        <Container>
            <Wrapper>
                <SearchContainer>
                    <TextField
                        value={searchValue}
                        onChange={(event) => {
                            setPage(0)
                            setPageSize(20)
                            setSearchValue(event.target.value)
                        }}
                        fullWidth
                        color='primary'
                        size='medium'
                        id="search"
                        type="search"
                        variant="outlined"
                        placeholder='Search for teams, players, matches'
                    /></SearchContainer>
                <StatsTable playersStats={playersStats} isLoading={isLoading} page={page} setPage={setPage}
                            pageSize={pageSize} setPageSize={setPageSize} rowCount={totalElements}/>
            </Wrapper>
        </Container>
    );
}

export default App;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
  background-color: #191C2B;
  color: #8CA2B0;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 2rem;
`
const SearchContainer = styled.div`
  & .MuiInputBase-root {
    color: #8CA2B0;

  }
`