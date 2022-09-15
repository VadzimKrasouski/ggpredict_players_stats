import {DataGrid, GridColDef, GridRenderCellParams, GridRowsProp} from '@mui/x-data-grid';
import styled from "@emotion/styled/macro";
import {LinearProgress} from "@mui/material";
import {useMemo} from "react";
import {PlayersData} from "../App";

interface Props {
    playersStats: Array<PlayersData>
    isLoading: boolean
    page: number
    setPage: (page: number) => void
    pageSize: number
    setPageSize: (pageSize: number) => void
    rowCount: number
}

export const StatsTable: React.FC<Props> = ({
                                                playersStats,
                                                isLoading,
                                                rowCount,
                                                pageSize,
                                                setPageSize,
                                                setPage,
                                                page
                                            }) => {

    const rows: GridRowsProp = useMemo(
        () =>
            playersStats?.map(
                ({
                     id,
                     name,
                     nick,
                     birthYear,
                     country,
                     photo,
                     won,
                     drawn,
                     lost
                 }) =>
                    ({
                        photo: photo,
                        id: id,
                        name: name,
                        nick: nick,
                        age: new Date().getFullYear() - birthYear,
                        country: country,
                        won: won,
                        drawn: drawn,
                        lost: lost
                    } || []),
            ),
        [playersStats])

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'NAME', flex: 100, headerAlign: 'center', sortable: false},
        {field: 'nick', headerName: 'NICK', flex: 100, headerAlign: 'center', sortable: false},
        {field: 'age', headerName: 'AGE', flex: 100, headerAlign: 'center', align: 'center', sortable: false},
        {
            field: 'country', headerName: 'COUNTRY', flex: 100, headerAlign: 'center', align: 'center', sortable: false,
            renderCell: (params: GridRenderCellParams<string>) => (
                <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${params?.value?.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${params?.value?.toLowerCase()}.png 2x`}
                    alt=""
                />)
        },
        {
            field: 'won',
            headerName: 'WON',
            flex: 100,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'won-column--header',
            sortable: false
        },
        {
            field: 'drawn',
            headerName: 'DRAWN',
            flex: 100,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'drawn-column--header',
            sortable: false
        },
        {
            field: 'lost',
            headerName: 'LOST',
            flex: 100,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'lost-column--header',
            sortable: false
        },
    ];

    return (
        <Container>
            <Wrapper>
                <HeaderContainer><Header>PLAYERS</Header></HeaderContainer>
                <StyledDataGrid rows={rows}
                                rowCount={rowCount}
                                loading={isLoading}
                                rowsPerPageOptions={[5, 10, 20, 50]}
                                pagination
                                page={page}
                                pageSize={pageSize}
                                paginationMode="server"
                                onPageChange={(newPage) => setPage(newPage)}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                columns={columns}
                                components={{
                                    LoadingOverlay: LinearProgress,
                                }}
                                disableColumnMenu
                />
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  height: 80vh;
  width: 100%;
`

const Wrapper = styled.div`
  flex-grow: 1;

  & .won-column--header {
    color: green;
  }
;

  & .drawn-column--header {
    color: #8CA2B0;
  }
;

  & .lost-column--header {
    color: red;
  }
`
const HeaderContainer = styled.div`
  border-radius: 4px;
  color: #8CA2B0;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #1F2334;
  margin: 1rem 0;
`

const Header = styled.div`
  height: 48px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  border-radius: 4px;
  background-image: linear-gradient(180deg, #1C1F30 0%, #25293C 100%);
`
const StyledDataGrid = styled(DataGrid)`
  color: white;
  border: none;

  & .MuiDataGrid-cell {
    border-color: gray;
  }

  & .MuiDataGrid-columnHeaders {
    border-color: gray;
  }

  & .MuiDataGrid-footerContainer {
    border-color: gray;
  }

  & .MuiTablePagination-root {
    justify-content: space-between;
    color: #8CA2B0;
  }

  & .MuiDataGrid-iconSeparator {
    display: none;
  }
`