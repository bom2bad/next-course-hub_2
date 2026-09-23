export default function HomePage() {
  const siteName: string = "Student Course Hub";
  const courseCount: number = 3;
  const isOpen: boolean = true;
  const topics: string[] = ["โครงสร้างข้อมูล", "วิศวกรรมซอฟต์แวร์", "เว็บเทคโนโลยี"];

  


  return (
    <main>
      <h1>{siteName}</h1>
      <p>จำนวนรายวิชา: {courseCount}</p>
      <p>สถานะระบบ: {isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
      
    </main>
  );
}
