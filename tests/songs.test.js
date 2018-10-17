const app = require("../app");
const request = require("supertest");

describe("routes/songs", () => {

  it("POST /songs should return a new song object", () => {
    requestBody = { name: "test song", artist: "rhianna"};
    
    return request(app)
    .post("/songs")
    .send(requestBody)
    
    .then(response => {
      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(requestBody);
    });
  });

  it("POST /songs invalid name should return status 422", () => {
    requestBody = { name: "t", artist: "rhianna"};
    
    return request(app)
    .post("/songs")
    .send(requestBody)
    
    .then(response => {
      expect(response.status).toEqual(422);
      expect(response.body).toMatchObject(requestBody);
    });
  });
  
  it("GET /songs should return a non empty array", () => {
    return request(app)
    .get("/songs")
    
    .then(response => {
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toEqual(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
  
  it("GET /songs/:id should return the song with id", () => {
    expected = {id: 1, name: "test song", artist: "rhianna"};
    
    return request(app)
    .get("/songs/1")
    .send(requestBody)
    
    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(expected);
    });
  });

  it("GET /songs/:id should return 404 if song id does not exist", () => {
    return request(app)
    .get("/songs/10")
    .send(requestBody)
    
    .then(response => {
      expect(response.status).toEqual(404);
      expect(response.body).toMatchObject({message: 'Unable to find song with id: 10' });
    });
  });

  it("PUT /songs/id should return the updated song", () => {
    requestBody = {
      id: 1,
      name: "updated song",
      artist: "rhianna"
    };
    
    return request(app)
    .put("/songs/1")
    .send(requestBody)
    
    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(requestBody);
    });
  });

  it("PUT /songs/:id should return 404 if song id does not exist", () => {
    requestBody = {
      id: 10,
      name: "updated song",
      artist: "rhianna"
    };

    return request(app)
    .put("/songs/10")
    .send(requestBody)
    
    .then(response => {
      expect(response.status).toEqual(404);
      expect(response.body).toMatchObject({message: 'Unable to update song with id: 10' });
    });
  });

  it("DELETE /songs/:id should return the deleted song", () => {
    const ID = 1;
    expected = {
      name: "updated song",
      artist: "rhianna"
    };

    return request(app)
    .delete("/songs/1")

    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(expected);
    })
  });
  
  it("DELETE /songs/:id should return 404 if song id does not exist", () => {
    return request(app)
    .delete("/songs/10")
    
    .then(response => {
      expect(response.status).toEqual(404);
      expect(response.body).toMatchObject({message: 'Unable to delete song with id: 10' });
    });
  });

  it("GET /songs should return an empty array", () => {
    return request(app)
    .get("/songs")
    
    .then(response => {
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toEqual(0);
    });
  });

});
