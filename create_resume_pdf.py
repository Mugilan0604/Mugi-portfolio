import os

def create_pdf(filename):
    lines = [
        "MUGILAN - SOFTWARE TESTER & QA AUTOMATION ENGINEER",
        "Tamil Nadu, India | Mugilanmugilan636@gmail.com | linkedin.com/in/mugilan-qa",
        "--------------------------------------------------------------------------------",
        "",
        "PROFESSIONAL SUMMARY:",
        "Passionate Software Tester focused on delivering reliable, high-quality software",
        "through effective manual and automated testing practices. Experience in functional",
        "testing, test case design, bug identification, REST API testing & Swagger validation.",
        "Continuously developing test automation skills using Python, Pytest, and Playwright.",
        "",
        "TECHNICAL SKILLS:",
        "- Manual Testing: Functional, Regression, Smoke, Sanity, Exploratory, BVA, EP, STLC/SDLC",
        "- Automation Testing: Python, Pytest, Page Object Model (POM), XPath, CSS Selectors, Test Validation",
        "- API Testing: Postman, Swagger / OpenAPI, REST API, HTTP Methods (GET, POST, PUT, DELETE), JSON Validation",
        "- Database: SQL, MySQL, Basic CRUD Operations, Data Integrity Validation",
        "- Tools: Git, GitHub, Jira, VS Code, Chrome DevTools",
        "",
        "PRACTICAL WORK & PROJECT EXPERIENCE:",
        "1. Web Application Automation Testing Framework (Python, Pytest, POM)",
        "   - Automated login, navigation, form boundary validation, and checkout workflows.",
        "   - Implemented Page Object Model (POM) pattern for maintainable tests.",
        "2. REST API Testing and Automation (Postman, Swagger / OpenAPI, Python Requests)",
        "   - Validated status codes, Swagger contracts, JSON response schemas, and token authorization.",
        "3. Property Management System QA Case Study (Manual, API & Database QA)",
        "   - Designed test suites covering tenant onboarding, lease lifecycle, and maintenance tickets.",
        "   - Tested Swagger API endpoints for listings, rent calculations (BVA), and SQL integrity.",
        "4. Functional Testing & Defect Management",
        "   - Designed positive/negative test matrices, tracked defects in Jira with reproduction steps.",
        "",
        "METHODOLOGY & EDUCATION:",
        "- Six-Step Testing Approach: Analysis, Planning, Design, Execution, Reporting, Regression",
        "- Committed to Continuous QA Learning & Defect Prevention"
    ]
    
    stream_content = "BT\n/F1 9.5 Tf\n40 760 Td\n14 TL\n"
    for line in lines:
        escaped = line.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
        if line.startswith("MUGILAN"):
            stream_content += f"/F1 14 Tf\n({escaped}) Tj T*\n/F1 10 Tf\n"
        elif line.endswith(":") or line.startswith("---"):
            stream_content += f"/F1 11 Tf\n({escaped}) Tj T*\n/F1 10 Tf\n"
        else:
            stream_content += f"({escaped}) Tj T*\n"
    stream_content += "ET"
    
    stream_bytes = stream_content.encode("latin-1")
    length = len(stream_bytes)
    
    objects = []
    # 1: Catalog
    objects.append(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
    # 2: Pages
    objects.append(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")
    # 3: Page
    objects.append(b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n")
    # 4: Contents
    objects.append(f"4 0 obj\n<< /Length {length} >>\nstream\n".encode("latin-1") + stream_bytes + b"\nendstream\nendobj\n")
    # 5: Font
    objects.append(b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")
    
    header = b"%PDF-1.4\n"
    xref = b"xref\n0 6\n0000000000 65535 f \n"
    offset = len(header)
    body = b""
    for obj in objects:
        xref += f"{offset:010d} 00000 n \n".encode("latin-1")
        offset += len(obj)
        body += obj
        
    trailer = f"trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n{offset}\n%%EOF\n".encode("latin-1")
    
    with open(filename, "wb") as f:
        f.write(header + body + xref + trailer)
    print(f"Successfully generated {filename}")

if __name__ == "__main__":
    create_pdf("Mugilan_Software_Tester_Resume.pdf")
