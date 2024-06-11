import React, { useState } from "react";
import { Container, VStack, Text, Input, Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import Papa from "papaparse";

const Index = () => {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setCsvData(results.data);
        },
      });
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Upload CSV File</Text>
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
        {csvData.length > 0 && (
          <Box width="100%" overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  {Object.keys(csvData[0]).map((key) => (
                    <Th key={key}>{key}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {csvData.map((row, index) => (
                  <Tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <Td key={i}>{value}</Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;