import axios from 'axios';
import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { generateHash, generateUUID } from './helper';
const prisma = new PrismaClient();


const seedCountry = async (name: String) => {
    try {
        // Fetch countries data
        const countryData = await axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json');
        const selectedCountry = countryData.data.find((country: { name: string; }) => country.name === name);
        // Extract country details
        const existingProvince = await prisma.country.findFirst({
            where: {
                name: name.toString(), // Criteria to find the province
            }
        });
        if (existingProvince) {
            return console.log("data already available")
        } else {
            const countryDetails = {
                name: selectedCountry.name,
                code: selectedCountry.iso2,
                region: selectedCountry.region,
                phone_code: selectedCountry.phone_code,
                numeric_code: selectedCountry.numeric_code,
                currency: selectedCountry.currency,
                currency_name: selectedCountry.currency_name,
                currency_symbol: selectedCountry.currency_symbol,
                emoji: selectedCountry.emoji,
                timezones: JSON.stringify(selectedCountry.timezones[0]),
                lat: selectedCountry.latitude,
                long: selectedCountry.longitude
            };

            const createdCountry = await prisma.country.create({ data: countryDetails });

            // Fetch states+cities data
            const statesCitiesData = await axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states%2Bcities.json');
            const countryStatesCities = statesCitiesData.data.filter((state: { country_id: any; }) => state.country_id === selectedCountry.id);
            // Process states and cities
            for (const state of countryStatesCities) {
                // Extract state details
                // Log state country_id
                const stateDetails = {
                    country_id: Number(createdCountry.id),
                    name: state.name,
                    code: state.state_code,
                    lat: state.latitude,
                    long: state.longitude
                };
                const existingProvince = await prisma.province.findFirst({
                    where: {
                        name: state.name, // Criteria to find the province
                        country_id: Number(createdCountry.id) // Additional criteria, if any
                    }
                });
                if (existingProvince) {
                    console.log(`provice ${existingProvince.name}`)
                } else {
                    const createdState = await prisma.province.create({ data: stateDetails });
                    for (const city of state.cities) {
                        // Extract city details
                        const cityDetails = {
                            province_id: Number(createdState.id),
                            name: city.name,
                            lat: city.latitude,
                            long: city.longitude
                        };
                        const existingCity = await prisma.city.findFirst({
                            where: {
                                name: city.name,
                                province_id: Number(createdState.id)
                            }
                        });
                        if (existingCity) {
                            console.log(`city ${existingCity.name} available`)
                        }
                        else {
                            const createdCity = await prisma.city.create({ data: cityDetails });
                        }

                    }
                }
            }
            return console.log("job done!");
        }
    } catch (error) {
        console.error('Failed to seed country:', error);
        throw new Error(`Failed to create country: ${error}`);
    }
};

const seedVehicles = async () => {
    try {
        const languageData: any = fs.readFileSync('./jsondata/vehicleData.json', 'utf-8');
        const jsonData = JSON.parse(languageData);
        for (const item of jsonData.vehicles) {
            const existingCar = await prisma.vehicles.findFirst({
                where: {
                    manufacturer: item.make, // Assuming 'make_by' corresponds to 'manufacturer' in your schema
                    car_model: item.model
                }
            });
            if (existingCar) {
                console.log(`City ${existingCar.car_model} available`);
            } else {
                const createdCar = await prisma.vehicles.create({
                    data: {
                        manufacturer: item.make,
                        car_model: item.model,
                        battery_capacity: item.battery_capacity,
                        variants: item.variants,
                        status: true
                        // Add other properties you want to assign when creating a new vehicle
                    }
                });
                console.log(`Created city ${createdCar.car_model}`);
            }
        }
    } catch (error) {
        console.log("err", error);
    }
}

const seedOrg = async () => {
    try {
        const res = await prisma.organization.create({
            data: {
                location_id: 1,
                name: "HeliosEVC",
                email: "heliosevc@gmail.com",
                phone_number: "+919626950018"
            }
        })
        if (res) {
            console.log("org created")
        }
    } catch (error) {
        console.log("error in org creation", error)
    }
}

const seedLocation =async () => {
    try {
        const res = await prisma.locations.create({
            data:{
                country_id: 1,
                city_id:2856,
                province_id: 31,
                address_line1:"chennai",
                address_line2:"chennai",
                postal_index_code: "600100",
            }
        })
        return res;
    } catch (error) {
        console.log("err in loction",error)
    }
}

const seedAccount =async () => {
    try {
        const res = await prisma.accounts.create({
            data:{
                organization_id:1,
                location_Id:1,
                name:"HeliosEVC",
                email:"heliosevc@gmail.com",
                phone_number:"+9626950018",
                status:1,
                credit_limit:500000,
                bank_account:"UIT000018905",
                bank_name:"Axis Bank",
                payee_name:"jhon",
                ifsc_code:"ABC12345",
                tax_number:"tsx123458990",
                gst_number:'gst12345880'
            }
        })
        return res;
    } catch (error) {
        console.log("err in account",error)
    }
}

const seedAdmin = async () => {
    try{
        const res = await prisma.admins.create({
            data:{
                account_id: 1,
                organization_id: 1,
                uuid: await generateUUID(),
                status: 1,
                password_digest: await generateHash('Pass@123456'),
                email: 'anandhakumar@aptonworks.com',
                phone_number:"+919626950009",
                first_name: 'anand',
                last_name:'kumar'
              },
    })
    console.log(res)
    return res;
    }catch(error){
        console.log(error)
    }
   
}

const findAdmin = async () => {
    const admin = await prisma.admins.findUnique({
        where: { email: 'anandhakumar@aptonworks.com'},
    });
    console.log(admin);
}

const seedConnectorTyps = async()=>{
    try {
        const connectors: any = fs.readFileSync('./jsondata/evConnector.json', 'utf-8');
        const jsonData = JSON.parse(connectors);
        for (const item of jsonData.connectors) {
            const existingConnector = await prisma.connectorTypes.findFirst({
                where: {
                    name: item.name, // Assuming 'make_by' corresponds to 'manufacturer' in your schema
                }
            });
            if (existingConnector) {
                console.log(`connector ${existingConnector.name} available`);
            } else {
                const createdConnector = await prisma.connectorTypes.create({
                    data: {
                        name: item.name,
                        // Add other properties you want to assign when creating a new vehicle
                    }
                });
                console.log(`Created type ${createdConnector.name}`);
            }
        }
    } catch (error) {
        console.log("err", error);
    }
}

const seedAmenities = async() => {
    try {
        const amenities: any = fs.readFileSync('./jsondata/amenities.json', 'utf-8');
        const jsonData = JSON.parse(amenities);
        for (const item of jsonData.amenities) {
            const existingConnector = await prisma.amenities.findFirst({
                where: {
                    name: item.name, // Assuming 'make_by' corresponds to 'manufacturer' in your schema
                }
            });
            if (existingConnector) {
                console.log(`connector ${existingConnector.name} available`);
            } else {
                const createdConnector = await prisma.amenities.create({
                    data: {
                        name: item.name,
                        // Add other properties you want to assign when creating a new vehicle
                    }
                });
                console.log(`Created type ${createdConnector.name}`);
            }
        }
    } catch (error) {
        console.log("err", error);
    }
}

// seedCountry("India"); // Pass the desired country id here
// seedVehicles();
// seedOrg();
// seedLocation();
// seedAccount();
// seedConnectorTyps();
// seedAmenities()
// seedAdmin()

