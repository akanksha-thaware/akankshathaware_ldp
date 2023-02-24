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
    cout<<"string to encrypt\n";
    cin>>s;
    for(i=0;i<s.size();i++){
        char current = s[i];
        // if digit or special char then replace with char at ascii + key
        if(isdigit(current) || !isalpha(current)){
            // get its ascii value + key
            int asc = (int)current + key;
            //  replace current 
            char ch = char(asc);
            s[i] = ch;
            result = s;
        }
        else
        // use caeser cipher for characters
        result+=(s[i]-'A'+key)%26+'A';
  
    }
    cout<<"\n\nencypted message is "<<result<<'\n';
    return 0;
}

