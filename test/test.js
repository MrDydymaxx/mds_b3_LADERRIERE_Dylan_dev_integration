const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

// ---> DEBUT
/**
  * Génération des nouvelles couleurs et enregistrement de ces
  * couleurs dans un tableau.
  */
const newValues = []
const colorKey = 'NEW_COLOR_'
let nextCursor = 0;
const payloadColor = () => {
  const nextColor = `${colorKey}${nextCursor}`
  newValues.push(nextColor)
  nextCursor++;
  return { 'color': nextColor }
}
const getCurrentCulor = () => {
  return nextCursor > 0 ? `${colorKey}${nextCursor - 1}` : `${colorKey}O`
}
// <-- FIN

// Tests

// should return all colors

it("should return all colors", done => {
	chai.request(app)
	.get('/colors')
	.end((err, res) => {
		if (err) done(err)
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');
			expect(res.body.results).to.be.an('array');
			expect(res).not.to.be.undefined;
		done();
	})
});

it("should return Bad Request", done => {
	chai.request(app)
	.get('/invalid')
	.end((err, res) => {
		if (err) done(err)
			expect(res).to.have.status(404);
		done();
	})
});

it("should add new color", done => {
	chai.request(app)
	.post('/colors')
	.set('content-type','application/json')
	.send({color:"Royal Blue"})
	.end((err, res) => {
		if (err) done(err)
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');
			expect(res.body.results).to.be.an('array');
			expect(res.body.results).include("ROYAL BLUE");
		done();
	})
});

it("should return new color list Request", done => {
	chai.request(app)
	.get('/colors')
	.end((err, res) => {
		if (err) done(err)
			expect(res).to.have.status(200);
		  expect(res).to.be.json;
		  expect(res.body).to.be.an('object');
		  expect(res.body.results).to.be.an('array');
		done();
	})
});


