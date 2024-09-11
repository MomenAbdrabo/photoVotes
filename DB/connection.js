import mongoose from "mongoose"

const connectionDB= async()=>{
return await mongoose.connect(process.env.DB_URL)
.then((result) => {
    console.log(`DB connected Successfully .................`)
}).catch((err) => {
    console.log(` Fail to connect on DB  ................. ${err}`)
});

} 
export default connectionDB