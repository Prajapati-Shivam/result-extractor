import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse/lib/pdf-parse";

// function extractMumbaiEducationTrustStudents(text) {
//   // Regex to match students with "Mumbai Education Trust" in their details
//   const studentRegex = /(\d{7})\s+([A-Z\s]+)\s+\(MU\d+\)\s+MU-\d+: Mumbai Education Trust.*?\(\s*(\d+\.\d{2})\s*\)\s+\*/gs;

//   let students = [];
//   let match;

//   while ((match = studentRegex.exec(text)) !== null) {
//       let seatNo = match[1].trim();
//       let name = match[2].trim();
//       let cgpa = parseFloat(match[3]);

//       students.push({ seatNo, name, cgpa });
//   }
//   console.log(JSON.stringify(students, null, 2)); 
//   return students;
// }

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "results_data.pdf");

    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: "File not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(fileBuffer);
    
    let processedText = pdfData.text.replace(/\n/g, "").replace(/University Of Mumbai\s+OFFICE REGISTER.*?EXAMINATION HELD IN DECEMBER \d{4}\s+.*?PAGE\s*:\s*\d{1,3}/gs, "").trim().replace(/@\s*[:;].*?\( NEP 2020 \) EXAMINATION HELD IN DECEMBER \d{4}\s*%Marks Grade\s*>=90 O\s*>=80 and <90 A\+\s*>=70 and <80 A\s*>=60 and <70 B\+\s*>=55 and <60 B\s*>=\s*50 and <55 C\s*>=40 and <50 D\s*<\s*40 F\s*GRADE POINT\s*10 9 8 7 6 5 4 0/gs, "***");
    return new Response(JSON.stringify({ text: processedText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
