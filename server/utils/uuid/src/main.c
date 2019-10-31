#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>

int create_by_time();
int create_by_name();

/* 
*   argv[1] -> type
*   argv[2] -> data
*/
int main (int argc, char *argv[]) {
    if (argc < 3) { return -1; }

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
    // target time
    struct timespec time_obj={0, 0};
    clock_gettime(CLOCK_REALTIME, &time_obj);

    long long target_time = (long long)time_obj.tv_sec*1000000000 + (long long)time_obj.tv_nsec;

    // rand
    srand(target_time);
    long long rand_num = (long long)(rand()%(999999999999999999 - 100000000000000000) + 100000000000000000);
    long long  rand_num_1 = (long long)(rand()%(99999999999999999 - 10000000000000000) + 100000000000000000);

    // result
    printf("%x%x%x", target_time, (rand_num + rand_num_1)<<1, (target_time + rand_num)>>1);
}

// by name
int create_by_name (char *params_data) {

}

// get MAC
int get_MAC (char *var) {

}