"use client"
import Image from "next/image";
import ChartData from "@/components/ChartData";
import TableData from "@/components/TableData";
import { useState } from "react";

export default function Home() {
  const [Longitude, setLongitude] = useState("");
  const [Latitude, setLatitude] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function submitHandler(e) {
    console.log(startDate, endDate);
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    // Validate inputs
    if (!Latitude || !Longitude || !startDate || !endDate) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    // Fetch weather data from the API
    fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${Latitude}&longitude=${Longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean,temperature_2m_max,temperature_2m_min,apparent_temperature_mean,apparent_temperature_max,apparent_temperature_min`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

  }
  return (
    <div className="flex flex-col items-center gap-10 w-full">
      {/* form input for API fetch parameters */}
      
      <section className="flex flex-col gap-[32px] px-1">
        <header>
          <Image src="/weather-icon.png" alt="Weather Icon" width={100} height={100} />
        <h1 className="text-3xl font-bold mt-5  ">Weather Data Fetcher</h1>
        <p className="text-md">Enter your location and date range to fetch weather data.</p>
      </header>
        <form className="flex flex-col gap-[16px] w-full sm:w-[400px]" onSubmit={submitHandler}>
          <input type="number" placeholder="Lattitude" value={Latitude}
          className="border p-2 rounded-md bg-white" onChange={(e) => setLatitude(e.target.value)} required/>
          <input type="number" placeholder="Longitude" value={Longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="border p-2 rounded-md bg-white" required/>
          <input type="date" placeholder="Start Date" value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded-md bg-white" required/>
          <input type="date" placeholder="End Date" value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded-md bg-white" required/>
          <input type="submit" className="p-2 bg-blue-400 text-white rounded-md cursor-pointer"/>
        </form>
      </section>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-blue-500">Loading...</p>}
      <main className="w-full p-5"> 
        {/* chartjs display of the requested data */}
          <div  >
            <ChartData data={data}/>
          </div>
          {/* Tabular display of the requested data */}
          <div >
            <TableData  data={data}/>
          </div>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Footer
      </footer> */}
    </div>
  );
}
