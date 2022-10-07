package com.codestates.member.jwt.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class FirstFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
// doFilter : 필터체인으로 연결하여 줍니다. 체인의 경우 순서를 지정할 수 있습니다. 체인의 가장 마지막에는 클라이언트가 요청한 최종 자원이 위치합니다.
        HttpServletRequest req = (HttpServletRequest) request; // HttpServletRequest : Http 프로토콜의 request 정보를 서블릿에 전달하기 위한 목적으로 사용
        HttpServletResponse res = (HttpServletResponse) response; // HttpServletResponse :  Content Type, 응답코드, 응답 메세지 등을 담아서 전송한다.

        res.setCharacterEncoding("UTF-8");

        if (req.getMethod().equals("POST")) {
            String headerAuth = req.getHeader("Authorization");// header 의 Token

            if (headerAuth.equals("seb_54")) {
                chain.doFilter(req, res); // 다음 필터로 넘기는 작업을 수행한다.
            } else {
                PrintWriter writer = res.getWriter();
                writer.println("인증 실패");
            }
        }
    }
}
