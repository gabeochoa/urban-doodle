
#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__) || defined(__MINGW32__) || defined(__BORLANDC__)
    #define OS_WIN
#endif

// M_PI not defined on windows? 
#ifdef OS_WIN
    #define _USE_MATH_DEFINES
    #include <cmath>
#endif


int main()
{
    return 0;
}

