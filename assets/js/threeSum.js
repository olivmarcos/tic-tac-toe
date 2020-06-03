/**
 * @param {number[]} nums
 * @return {number[][]}
 */

export let threeSum = function(nums) {

    let ret = []; //ret is "return"
    if(!nums || nums.length<3) return ret;
  
    nums = nums.sort(function(a,b){return a-b;});
  
    for(let y=0;y<nums.length-2;y++) {
      if(y==0 || nums[y]>nums[y-1]) {
        let j = y+1;
        let k = nums.length-1;
  
        while(j<k) {
          let sum = nums[y]+nums[j]+nums[k];
          if(sum==15) {
            ret.push([nums[y],nums[j],nums[k]]);
            j++;
            k--;
  
            //skip duplicates from j iterator                   
            while(j<k && nums[j]==nums[j-1])
              j++;
  
            //skip duplicates from k iterator
            while(j<k && nums[k]==nums[k+1])
              k--;                
          }
  
          //if sum < 0 then we know we need to increase our lower number (remember the array is sorted)
          else if(sum < 15) {
            j++;
          }
          //if sum > 0 then we need to decrease our upper number
          else {
            k--;
          }
        }
      }
    }
  
    return ret;
  }

  /*This is not made by myself. You can check it right here: https://tstewart.herokuapp.com/3sum-javascript/ */