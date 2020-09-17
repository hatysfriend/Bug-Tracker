const assert = require('assert');
const commentRepo = require("../data/commentRespository");
const bugRepo = require('../data/bugRepository');
const expect = require('chai').expect;
const seedUserData = require('../data/seedUserData');

let insertedUser;
let insertedBug;

describe('COMMENT TESTS ->', () => {
  beforeEach(async () => {
    await bugRepo.DeleteCollection();
    let bug = {
      name: "Testy New Bug",
      author: "Thomas",
      status: "Fixed",
      description: "Will It Blend",
      tags: [{name: "cool", colour: "info"}],
      date: new Date(2020,07,01),
      comments: [],
    };
    
    insertedBug = await bugRepo.InsertSingleBug(bug)
    insertedUser = await seedUserData.seed();
  });
  
  afterEach(async () => {
    await bugRepo.DeleteCollection();
  });
  
  describe("Insert Single Comment ->", () => {
      it('Inserts a Comment Successfully', (done) => {
        let comment = {
          comment: "This is a comment",
          user: insertedUser._id,
          likes: [{user: insertedUser._id}]
        }
  
        commentRepo.InsertComment(insertedBug._id, comment)
          .then((data) => {
            expect(data).to.not.equal(null);
            let commentResult = data;
            expect(commentResult.comment).to.be.equal('This is a comment');
            expect(commentResult.user).to.be.equal(insertedUser._id);
            expect(commentResult.likes[0].user).to.be.equal(insertedUser._id);
            done();
          });
      });
  });

  describe("Get all Comments ->", () => {
    it('Returns Populated Comments ->', async () => {
      let commentOne = {
        comment: "This is comment one",
        user: insertedUser._id,
        likes: [{user: insertedUser._id}]
      }
  
      let commentTwo = {
        comment: "This is the second comment",
        user: insertedUser._id,
        likes: [{user: insertedUser._id}]
      }
  
      await commentRepo.InsertComment(insertedBug._id, commentOne);
      await commentRepo.InsertComment(insertedBug._id, commentTwo);
      
      
      commentRepo.GetAllComments(insertedBug._id)
        .then((data) => {
          expect(data).to.not.equal(null);
          expect(data.length).to.be.equal(2);
                 
          let commentOneResult = data[0];
          console.log('USER RETURN1' + commentOneResult.user);
          console.log('USER RETURN2' +insertedUser);
          expect(commentOneResult.comment).to.be.equal('This is comment one');
          expect(commentOneResult.user._id.toString()).to.be.eql(insertedUser._id.toString());
          expect(commentOneResult.user.username).to.be.eql(insertedUser.username);
          expect(commentOneResult.user.password).to.be.eql(insertedUser.password);
          expect(commentOneResult.likes[0].user).to.be.eql(insertedUser._id);
  
          let commentTwoResult = data[1];
          expect(commentTwoResult.comment).to.be.equal('This is the second comment');       
          expect(commentTwoResult.user._id.toString()).to.be.eql(insertedUser._id.toString());
          expect(commentTwoResult.user.username).to.be.eql(insertedUser.username);
          expect(commentTwoResult.user.password).to.be.eql(insertedUser.password);
          expect(commentTwoResult.likes[0].user).to.be.eql(insertedUser._id);
      });     
    });
  });

  describe('Update Comment ->', () => {
    it('Updates Comment Name With Bug', async () => {
      let commentOne = {
        comment: "This is comment one",
        user: insertedUser._id,
        likes: [{user: insertedUser._id}]
      }

      let insertedComment = await commentRepo.InsertComment(insertedBug._id, commentOne);
      console.log('insertedComment'+ insertedComment._id);
      
      let update = { comment: "The new comment" };
      commentRepo.UpdateComment(insertedBug._id, insertedComment._id, update)
        .then((data) => {
          console.log("RETURNED Data: " + data);
          expect(data).to.not.equal(null);
          expect(data.comments[0].comment).to.be.equal("The new comment");
        });
    });
  });

  describe('Delete Comment ->', () => {
    it('Delete a comment', async () => {
      let comment = {
        comment: "This COMMENT should be deleted...",
        user: insertedUser._id,
        likes: [{user: insertedUser._id}]
      };

      let insertedComment = await commentRepo.InsertComment(insertedBug._id, comment);

      await commentRepo.DeleteCommentByID(insertedBug._id, insertedComment._id);

      let bug = await bugRepo.GetBugByID(insertedBug._id);
      expect(bug).to.not.equal(null);
      expect(bug.comments.length).to.be.equal(0);
    });
  });
});

