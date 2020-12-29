import react, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Country from './country'
import {useSelector, useDispatch} from 'react-redux'

const CountryListStyled = styled.div`
display:grid;
grid-row-gap:2.3em;
border: 1p solid red;
background:var(--background);
justify-content:center;
padding:4em 2em;
`
function CountryList() {
    const dispatch = useDispatch()
    const countryList = useSelector((state) => state.countryList)

    useEffect(() => {
        fetch('https://restcountries.eu/rest/v2/all')
        .then((response)=> {
            return response.json()
        })
        .then((list)=>{
            dispatch({
                type: "SET_COUNTRY_LIST",
                payload: list
            })
        })
        .catch(()=>{
            console.log("Hubo un Error")
        })
    }, [dispatch]);

    return (
        <CountryListStyled>
            {
                countryList.map(({name, flag, population, region, capital})=>{
                    return (
                        <Country 
                            key={name}
                            flag={flag}
                            name={name}
                            population={population}
                            region={region}
                            capital={capital}
                        />
                    )
                })
            }
        </CountryListStyled>
    )
}

export default CountryList