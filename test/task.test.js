const request = require ("supertest");
const app = require("../server");
const chai = require ("chai");
const expect= chai.expect;

describe("API /tasks",() =>{
    let tareaId;
    it("deberia obtener tareas del usuario 2", async()=>{
        const res = await request (app).get("/tasks/1");
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
    });

    it("deberia crear una nueva tarea", async () =>{
        const res = await request(app)
        .post("/tasks")
        .send({
            user_id:2,
            asunto:"prueba",
            descripcion:"test",
            Estado:"pendiente"
        });

        expect (res.status).to.equal(201);
        expect (res.body).to.have.property("id_tarea");
        tareaId = res.body.id_tarea;
    });
     it("deberia actualizar la tarea", async ()=>{
     const res = await request (app)
     .put(`/tasks/${tareaId}`)
     .send({
        user_id: 2,
        asunto: "Tarea EDITADA",
        descripcion: "Ya fue modificada",
        store_URL: "",
        tipo_archivo: "",
        fecha_de_creacion: new Date().toISOString().slice(0, 19).replace("T", " "),
        Estado: "En proceso"
     });

     expect (res.status).to.equal(200);
     expect(res.body.message).to.include(`actualizada`);
     });

     it("deberia eliminar tarea", async ()=>{
        const res = await request (app).delete(`/tasks/${tareaId}`);
        expect (res.status).to.equal(200);
        
    });

    it("ya no deberia encontrar la tarea eliminada", async ()=>{
        const res = await request (app).get(`/tasks/one/${tareaId}`);
        expect (res.status).to.equal(404);
        expect(res.body).to.have.property("message").that.includes("no encontrada");
    });
});