query = `INSERT INTO position
                (company_id, department_id, name)
                VALUES
                (
                    "${req.body.companyID}", 
                    "${req.body.departmentID}",
                    "${req.body.positionName}",
                )`