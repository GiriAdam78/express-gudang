import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import { config } from "dotenv";
config();

const prisma = new PrismaClient();
const port = process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message:"Trustme Its Works"
    });
});

app.post('/gudang', async (req, res)=> {
    const {nama, alamat, kapasitas} = req.body;
    try{
        if(!nama){
            return res.status(500).json({
                status:"failed",
                message:"Nama Gudang Tidak Boleh Kosong !",
            });
        }

        if (!alamat){
            return res.status(500).json({
                status:"failed",
                message:"Alamat Gudang Harus Di Isi !",
            });
        }

        if(!kapasitas){
            return res.status(500).json({
                status:"failed",
                message:"Kapasitas Gudang Hanya Berupa angka Bukan Text !"
            });
        }

        const gudang = await prisma.gudang.create({
            data: { nama, alamat, kapasitas },
        });
        res.json(gudang);

    }catch(error){
        res.status(500).json({Error: error.message});
    }

});

app.listen(port, () => {
    console.info(`Server running on port ${port}`);
});
