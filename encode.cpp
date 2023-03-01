// Data Encryption System: Rahul wants to send encoded messages to his friend Ram. 
// Develop an algorithm to encode all the digits, special characters, lower and upper case alphabets.


#include<iostream>
#include<string>

using namespace std;
int main(){
    int i;
    string s,result;
    // let key is 4
    int key = 4;
    cout<<"enter string to encrypt : \n";
    getline(cin, s);
    for(i=0;i<s.size();i++){
        char current = s[i];
        result+=(s[i]-'a'+key)%26+'a';
    }
    cout<<"\n\nencypted message is : "<<result<<'\n';
    return 0;
}

