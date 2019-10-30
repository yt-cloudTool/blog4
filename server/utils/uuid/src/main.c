#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/time.h>

int create_by_time();
int create_by_name();

/* 
*   argv[1] -> type
*   argv[2] -> data
*/
int main (int argc, char *argv[]) {
    if (argc < 3) { return -1;  }

    char *params_type = argv[1];
    char *params_data = argv[2];

    // use byTime
    if (strcmp(params_type, "time") == 0) {
        create_by_time(params_data);
    }
    // use byName
    else if (strcmp(params_type, "name") == 0) {
        create_by_name(params_data);
    }

    return 0;
}

// by time
int create_by_time (char *params_data) {
    // time
    struct timeval current_time;
    gettimeofday(&current_time, NULL);

    // target time
    long long target_time = (long long)current_time.tv_sec*1000 + (long long)current_time.tv_usec/1000;
    printf("%lld", target_time);
}

// by name
int create_by_name (char *params_data) {

}

// get MAC
int get_MAC (char *var) {

}