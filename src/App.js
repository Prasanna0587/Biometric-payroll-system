/*import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    hourlyRate: ""
  });
  const [face, setFace] = useState(null);
  const [message, setMessage] = useState("");
  const [payslip, setPayslip] = useState(null);

  useEffect(() => {
    startCamera();
    loadEmployees();
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const captureFace = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = 220;
    canvas.height = 160;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, 220, 160);
    setFace(canvas.toDataURL("image/jpeg"));
    setMessage("✅ Face captured");
  };

  const register = async () => {
    if (!face) {
      alert("Capture face first");
      return;
    }

    await fetch("http://localhost:8080/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, faceImage: face })
    });

    setMessage("✅ Employee registered");
    setForm({ name: "", role: "", hourlyRate: "" });
    setFace(null);
    loadEmployees();
  };

  const markAttendance = async (id) => {
    const hours = prompt("Enter worked hours:");
    await fetch("http://localhost:8080/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId: id, hoursWorked: hours })
    });
    alert("✅ Attendance marked");
  };

  const generatePayslip = async (id) => {
    const res = await fetch(`http://localhost:8080/api/attendance/payslip/${id}`);
    setPayslip(await res.json());
  };

  const deleteEmp = async (id) => {
    await fetch(`http://localhost:8080/api/employees/${id}`, { method: "DELETE" });
    loadEmployees();
  };

  const loadEmployees = async () => {
    const res = await fetch("http://localhost:8080/api/employees");
    setEmployees(await res.json());
  };

  return (
    <div className="container">
      <h1>Biometric Payroll System</h1>

      <div className="card">
        <video ref={videoRef} autoPlay />
        <canvas ref={canvasRef} hidden />
        <button onClick={captureFace}>Capture Face</button>

        <input placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />

        <input placeholder="Role" value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })} />

        <input type="number" placeholder="Hourly Rate" value={form.hourlyRate}
          onChange={e => setForm({ ...form, hourlyRate: e.target.value })} />

        <button onClick={register}>Register Employee</button>
        <p>{message}</p>
      </div>

      <h2>Employees</h2>

      {employees.map(emp => (
        <div className="emp-card" key={emp.id}>
         
          <div>
            <h3>{emp.name}</h3>
            <p>{emp.role}</p>
            <button onClick={() => markAttendance(emp.id)}>Attendance</button>
            <button onClick={() => generatePayslip(emp.id)}>Payslip</button>
            <button className="danger" onClick={() => deleteEmp(emp.id)}>Delete</button>
          </div>
        </div>
      ))}

      {payslip && (
        <div className="payslip">
          <h2>Payslip</h2>
          <p>Name: {payslip.name}</p>
          <p>Role: {payslip.role}</p>
          <p>Total Hours: {payslip.totalHours}</p>
          <p>Salary: ₹{payslip.salary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
*/

import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");
  const [employees, setEmployees] = useState([]);
  const [payslip, setPayslip] = useState(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    role: "",
    hourlyRate: ""
  });

  const [face, setFace] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  /* ================= LOAD EMPLOYEES ================= */
  const loadEmployees = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/employees");
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load employees", err);
      setEmployees([]);
    }
  };

  useEffect(() => {
    loadEmployees(); // load once on app start
  }, []);

  /* ================= CAMERA ================= */
  useEffect(() => {
    if (page === "register") startCamera();
    return stopCamera;
  }, [page]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch {
      setMessage("❌ Camera permission denied");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }
  };

  const captureFace = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = 260;
    canvas.height = 200;
    canvas.getContext("2d").drawImage(video, 0, 0, 260, 200);
    setFace(canvas.toDataURL("image/jpeg"));
    setMessage("✅ Face captured");
  };

  /* ================= ACTIONS ================= */

  const registerEmployee = async () => {
    if (!face) {
      alert("Please capture face first");
      return;
    }

    await fetch("http://localhost:8080/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        role: form.role,
        hourlyRate: form.hourlyRate,
        faceImage: face
      })
    });

    setMessage("✅ Employee registered");
    setForm({ name: "", role: "", hourlyRate: "" });
    setFace(null);

    // 🔥 IMPORTANT
    loadEmployees();
  };

  const markAttendance = async (id) => {
    const hrs = prompt("Enter working hours:");
    if (!hrs) return;

    await fetch("http://localhost:8080/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId: id, hoursWorked: hrs })
    });

    alert("✅ Attendance marked");
  };

  const generatePayslip = async (id) => {
    const res = await fetch(
      `http://localhost:8080/api/attendance/payslip/${id}`
    );
    setPayslip(await res.json());
  };

  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:8080/api/employees/${id}`, {
      method: "DELETE"
    });
    loadEmployees();
  };

  /* ================= UI ================= */

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Payroll</h2>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("register")}>Register</button>
        <button onClick={() => setPage("attendance")}>Attendance</button>
        <button onClick={() => setPage("payslip")}>Payslip</button>
        <button onClick={() => setPage("delete")}>Delete</button>
      </aside>

      <main className="content">
        

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <div className="dashboard">
            <div className="stat">
              👥 Total Employees
              <h1>{employees.length}</h1>
            </div>
            <div className="stat">
              🧠 Biometric Mode
              <h3>Face Recognition</h3>
            </div>
            <div className="stat">
              📄 Payroll
              <h3>Auto Generated</h3>
            </div>
          </div>
        )}

        {/* REGISTER */}
        {page === "register" && (
          <div className="card">
            <h1>Register Employee</h1>

            <video ref={videoRef} />
            <canvas ref={canvasRef} hidden />
            <button className="small" onClick={captureFace}>
              Capture Face
            </button>

            {face && <img src={face} alt="Captured face preview" className="preview" />}


            <input
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Role"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
            />
            <input
              placeholder="Hourly Rate"
              value={form.hourlyRate}
              onChange={e =>
                setForm({ ...form, hourlyRate: e.target.value })
              }
            />

            <button onClick={registerEmployee}>Register</button>
            <p className="msg">{message}</p>
          </div>
        )}

        {/* ATTENDANCE */}
        {page === "attendance" && (
          <div className="list">
            {employees.map(emp => (
              <div className="emp" key={emp.id}>
                <span>{emp.name}</span>
                <button
                  className="small"
                  style={{
    background: 'linear-gradient(135deg, #ff44b7ff,  #4447ffff)'
    
  }}
                  onClick={() => markAttendance(emp.id)}
                >
                  Mark
                </button>
              </div>
            ))}
          </div>
        )}

        {/* PAYSLIP */}
        {page === "payslip" && (
          <div className="list">
            {employees.map(emp => (
              <div className="emp" key={emp.id}>
                <span>{emp.name}</span>
                <button
                  className="small"
                  style={{
    background: 'linear-gradient(135deg, #8e5915, #d3af85)'
    
  }}
                  onClick={() => generatePayslip(emp.id)}
                >
                  Generate
                </button>
              </div>
            ))}

            {payslip && (
              <div className="payslip">
                <h2>Payslip</h2>
                <p>Name: {payslip.name}</p>
                <p>Role: {payslip.role}</p>
                <p>Total Hours: {payslip.totalHours}</p>
                <h3>₹ {payslip.salary}</h3>
              </div>
            )}
          </div>
        )}

        {/* DELETE */}
        {page === "delete" && (
          <div className="list">
            {employees.map(emp => (
              <div className="emp" key={emp.id}>
                <span>{emp.name}</span>
                {/* <button
                  className="danger small"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button> */}
                <button className="danger small"
  style={{
    background: 'linear-gradient(135deg, #ff4d4d, #ff1a1a)'
    
  }}
  onClick={() => deleteEmployee(emp.id)}
>
  Delete
</button>


              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
