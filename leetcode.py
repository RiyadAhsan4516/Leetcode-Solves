# 15. 3Sum
def threeSum(nums):
        result = [];
        nums.sort()
        for i in range(0,len(nums)):
            if i>0 and nums[i] == nums[i-1]:
                continue
            else:
                a = nums[i]
            b, c = i+1, len(nums)-1
            while b<c:
                summation = a+nums[b]+nums[c]
                if summation > 0:
                    c-=1;
                elif summation<0:
                    b+=1
                else:
                    result.append([a,nums[b],nums[c]])
                    b += 1
                    while nums[b] == nums[b-1] and b<c:
                        b+=1
        return result
# print(threeSum([-1,0,1,2,-1,-4]))

# 18. 4Sum
def fourSum(nums, target):
    result = []
    nums.sort()
    for i in range (0, len(nums)-3):
        if i>0 and nums[i]==nums[i-1]:
            continue
        else:
            a = nums[i]
        for j in range(i+1, len(nums)-2):
            if j >i+1 and nums[j]==nums[j-1]:
                continue
            else:
                b = nums[j]
            k,l = j+1, len(nums)-1
            while k<l:
                summation = a + b + nums[k] + nums[l]
                if summation > target:
                    l -= 1
                elif summation < target:
                    k += 1
                else:
                    result.append([a,b,nums[k],nums[l]])
                    k+=1
                    while nums[k] == nums[k-1] and k<l:
                        k+=1
    return result

print(fourSum([-2,-1,-1,1,1,2,2],0))
