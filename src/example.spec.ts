// /* eslint-disable prettier/prettier */
// // describe('my test' , ()=>{
// //   it('return true' , ()=>{
// //     expect(true).toEqual(true);
// //   })
// // })

// //featre
// class FriendList {
//   friends = [];
//   addfriend(name){
//     this.friends.push(name);
//   }
//   announceFriend(name){
//     global.console.log(`${name} is now your friend !`)
//   }
//   removeFriend(name){
//     const idx = this.friends.indexOf(name)
//     if(idx === -1){
//       throw new Error('friend  not found !')
//     }
//     this.friends.splice(idx , 1);
//   }

// }

// //
// describe('FriendList' , ()=>{

//   let friendList;
//   beforeEach(()=>{
//     friendList = new FriendList();
//   })

//   it('initializing friend list ' , ()=>{
    
//     expect(friendList.friends.length).toEqual(0);

//   })
//   it('add a friend to a list' , ()=>{
    
//     expect(friendList.friends.length).toEqual(0);
//     friendList.addfriend('khan');
//     expect(friendList.friends.length).toEqual(1)
//   })
//   it('announce friend' , ()=>{
    
//     friendList.announceFriend= jest.fn()
//     expect(friendList.announceFriend).not.toHaveBeenCalled()
//     friendList.announceFriend('khan');
//     friendList.addfriend('khan');
//     expect(friendList.announceFriend).toHaveBeenCalled()

//   })
// it('remove friend test' ,()=>{
//   friendList.removeFriend = jest.fn();
//   friendList.removeFriend('khan');
//   expect(friendList.removeFriend).toHaveBeenCalled()
// } )

// })
// describe('checkFriendLists' , ()=>{
//   let friendList;
//   beforeEach(()=>{
//     friendList = new FriendList();
//   })

//   it('friendlist exist if friend is deleted sucssessfully !' , ()=>{
//      friendList.addfriend('yousaf');
//     friendList.removeFriend = jest.fn()
//     expect(friendList.friends[0]).toEqual('yousaf');
//     friendList.removeFriend('yousaf')
//   expect(friendList.friends[0]).toEqual('yousaf')
//   })
//   it('condition friend not deleted and test failed throw error ' , ()=>{
//     // friendList.removeFriend = jest.fn();
//     expect(()=>friendList.removeFriend('yousaf')).toThrow(new Error('friend not found inside array'))
//   })

// })